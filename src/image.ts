/**
 * 本模块提供图片操作相关方法。
 * @packageDocumentation
 */

/**
 * 检查当前浏览器是否支持 WebP 格式。
 * @returns 当前浏览器是否支持 WebP 格式。
 */
export const supportWebP: () => boolean = (() => {
  function checkByCanvas(): boolean {
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
      const mimeType = 'image/webp';
      return elem.toDataURL(mimeType).indexOf('data:' + mimeType) === 0;
    }
    return false;
  }

  // iOS 和 macOS 都不支持通过 canvas 检查 WebP 的兼容性
  // 为了避免使用 image onload 或 onerror 的异步检测方式，通过 UA 来判断
  function checkByUA(): boolean {
    let result = false;
    const ua = navigator.userAgent;

    const iOSMatches = /\bOS\s([\d_.]+)\slike\sMac\sOS\sX\b/.exec(ua);
    if (iOSMatches) {
      result = parseInt(iOSMatches[1]) >= 14;
    } else {
      const safariMatches = /\bVersion\/([\d.]+)\sSafari\b/.exec(ua);
      if (safariMatches) { result = parseInt(safariMatches[1]) >= 16; }
    }

    return result;
  }

  let result: boolean | undefined;
  return () => {
    if (result == null) {
      try {
        result = checkByCanvas() || checkByUA();
      } catch {
        result = false;
      }
    }
    return result;
  };
})();

/**
 * 检查当前浏览器是否支持 AVIF 格式（注意，本函数是异步函数）。
 * @returns 当前浏览器是否支持 AVIF 格式。
 */
export const supportAVIF: () => Promise<boolean> = (() => {
  function check() {
    return new Promise<boolean>((resolve) => {
      const avif = new Image();
      avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
      avif.onerror = () => { resolve(false); };
      avif.onload = () => { resolve(true); };
      // 避免长时间不触发前面两个事件
      setTimeout(() => { resolve(false); }, 1000);
    });
  }

  let promise: Promise<boolean> | undefined;
  return () => {
    if (!promise) { promise = check(); }
    return promise;
  };
})();


/**
 * 压缩选项。
 */
export interface IOSSCompressOptions {
  /**
   * 压缩后的图片宽度。
   */
  width?: number
  /**
   * 压缩后的图片高度。
   */
  height?: number
  /**
   * 是否允许转换为 JPG。默认为 true。
   */
  allowJPG?: boolean
  /**
   * 是否允许转换为 WebP，默认为 'auto'。'auto' 表示当前浏览器支持 WebP，就进行转换。
   */
  allowWebP?: boolean | 'auto'
  /**
   * 是否允许转换为 AVIF。
   */
  allowAVIF?: boolean
}

// 获取扩展名
function getExtname(path?: string): string {
  const filename = (path || '').split('.');
  const extname = filename[filename.length - 1];
  return extname ? extname.toLowerCase() : '';
}

// 把压缩参数转换为标准格式，并设置默认值
function handleCompressOptions(
  options: IOSSCompressOptions | number
): IOSSCompressOptions {
  const opts = typeof options === 'number' ? { width: options } : options;
  opts.allowJPG = opts.allowJPG ?? true;
  opts.allowWebP = opts.allowWebP ?? 'auto';
  return opts;
}

// URL 对象的属性
interface IURL {
  search: string
  pathname: string,
  hostname: string,
  href: string
}

// 创建 URL 对象（兼容浏览器端和 Node.js 端）
function createURLObject(url: string): IURL | undefined {
  let urlObj: {
    search: string
    pathname: string,
    hostname: string,
    href: string
  } | undefined;

  if (typeof document !== 'undefined') {
    const a = document.createElement('a');
    a.href = url;
    urlObj = a;
  } else if (typeof URL === 'function') {
    try {
      urlObj = new URL(/^\/\//.test(url) ? ('https:' + url) : url);
    } catch {}
  }

  return urlObj;
}


// 生成 OSS 压缩参数
function genOSSCompressParams(extname: string, options: IOSSCompressOptions): string {
  let ossProccess = '';

  if (options.width != null || options.height != null) {
    ossProccess += '/resize';
    if (options.width) { ossProccess += ',w_' + options.width; }
    if (options.height) { ossProccess += ',h_' + options.height; }
    ossProccess += ',limit_1';
  }

  if (options.allowAVIF && extname !== 'gif') {
    ossProccess += '/format,avif';
  } else if (
    options.allowWebP === true || (options.allowWebP === 'auto' && supportWebP())
  ) {
    ossProccess += '/format,webp/quality,Q_80';
  } else if (options.allowJPG && extname !== 'gif') {
    ossProccess += '/format,jpg/quality,Q_80';
  }

  return ossProccess;
}

// 替换或追加压缩参数
function setOSSCompressParams(search: string, params: string): string {
  let replaced = false;
  search = search.replace(/([?&]x-oss-process)(?:=([^&]*))?/, (match, p1, p2) => {
    replaced = true;
    return !/^image/.test(p2)
      ? match
      : p1 + '=' + p2.replace(/\/(?:resize|format|quality)[^/]*/gi, '') + params;
  });

  return replaced
    ? search
    : search +
        (search.indexOf('?') === -1 ? '?' : '&') +
        'x-oss-process=image' +
        params;
}

/**
 * 追加或替换 OSS 图片压缩参数。
 * @param url 指定图片 URL。
 * @param options 压缩选项或缩放的宽度。
 * @returns 处理后的图片 URL。
 * @example
 * ```javascript
 * ossCompress(url, 300);
 * ossCompress(url, {
 *   width: 300,
 *   allowJPG: true,
 *   allowWebP: 'auto'
 * });
 * ```
 */
export function ossCompress(
  url: string, options: IOSSCompressOptions | number
): string {
  const urlObj = createURLObject(url);
  if (!urlObj) { return url; }

  const extname = getExtname(urlObj.pathname.split('/').pop());
  // 仅处理 CDN 域名
  if (!/\.videocc\.net$/i.test(urlObj.hostname) || extname === 'svg') { return url; }

  const opts = handleCompressOptions(options);

  const ossProcess = genOSSCompressParams(extname, opts);
  if (ossProcess) {
    urlObj.search = setOSSCompressParams(urlObj.search, ossProcess);
  }

  return urlObj.href;
}


// 生成 COS 压缩参数
function genCOSCompressParams(extname: string, options: IOSSCompressOptions): string {
  let cosProcess = '';
  if (options.width != null && options.height != null) {
    cosProcess += `/thumbnail/${options.width}x${options.height}`;
  } else if (options.width != null) {
    cosProcess += `/thumbnail/${options.width}x`;
  } else if (options.height != null) {
    cosProcess += `/thumbnail/x${options.height}`;
  }

  if (options.allowAVIF && extname !== 'gif') {
    cosProcess += '/format/avif';
  } else if (
    options.allowWebP === true || (options.allowWebP === 'auto' && supportWebP())
  ) {
    cosProcess += '/format/webp/quality/80';
  } else if (options.allowJPG && extname !== 'gif') {
    cosProcess += '/format/jpg/quality/80';
  }

  return cosProcess;
}

// 替换或追加压缩参数
function setCOSCompressParams(search: string, params: string): string {
  let replaced = false;
  search = search.replace(/([?&]imageMogr2)(\/[^&]*)/, (match, p1, p2) => {
    replaced = true;
    return p1 + '=' + p2.replace(/\/(?:thumbnail|format|quality)\/[^/]+/gi, '') + params;
  });

  return replaced
    ? search
    : search +
        (search.indexOf('?') === -1 ? '?' : '&') +
        'imageMogr2' +
        params;
}

/**
 * 追加或替换 COS 图片压缩参数。
 * @param url 指定图片 URL。
 * @param options 压缩选项或缩放的宽度。
 * @returns 处理后的图片 URL。
 */
export function cosCompress(
  url: string, options: IOSSCompressOptions | number
): string {
  const urlObj = createURLObject(url);
  if (!urlObj) { return url; }

  const extname = getExtname(urlObj.pathname.split('/').pop());
  if (
    !/(?:\.videocc\.net|\.kingswayvideo\.com)$/i.test(urlObj.hostname) ||
    extname === 'svg'
  ) {
    return url;
  }

  const opts = handleCompressOptions(options);

  const ossProcess = genCOSCompressParams(extname, opts);
  if (ossProcess) {
    urlObj.search = setCOSCompressParams(urlObj.search, ossProcess);
  }

  return urlObj.href;
}

/**
 * 对指定 HTML 代码中 img 标签的图片地址做 OSS 压缩处理。
 * @param html 指定 HTML 代码。
 * @param options 压缩选项。
 * @param compressor 压缩器。可以使用本模块下的 ossCompress 或 cosCompress，默认为 ossCompress。
 * @returns 处理后的 HTML 代码。
 */
export function compressHTMLImgs(
  html: string,
  options: IOSSCompressOptions,
  compressor: (url: string, options: IOSSCompressOptions | number) => string = ossCompress
): string {
  if (!html) { return ''; }
  return html.replace(
    /(<img.*?\ssrc=)(["']?)(.+?)\2(.*?>)/gi,
    (match, before, quot, src, after) => {
      return before + '"' + compressor(src, options) + '"' + ' data-src="' + src + '"' + after;
    },
  );
}


/**
 * 预加载图片。
 * @param url 图片 URL。
 * @returns 图片尺寸和图片元素。
 * @example
 * ```javascript
 * await preloadImg('https://example.com/image.jpg'); // { width, height, element }
 * ```
 */
export function preloadImg(url: string): Promise<{
  width: number
  height: number,
  element: HTMLImageElement
}> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    function onload() {
      resolve({
        width: img.width,
        height: img.height,
        element: img
      });
    }

    img.onload = onload;
    img.onerror = function() {
      reject(
        new Error(`"${url}" load failed.`)
      );
    };

    img.src = url;
    if (img.complete) { onload(); }
  });
}
