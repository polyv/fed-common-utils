/**
 * 本模块提供图片操作相关方法。
 * @packageDocumentation
 */

/**
 * 检查当前浏览器是否支持 WebP 格式。
 * @returns 当前浏览器是否支持 WebP 格式。
 */
export const supportWebP: () => boolean = (() => {
  function check(): boolean {
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
      const mimeType = 'image/webp';
      return elem.toDataURL(mimeType).indexOf('data:' + mimeType) === 0;
    }
    return false;
  }

  let result: boolean | undefined;
  return () => {
    if (result == null) { result = check(); }
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
  width?: number,
  /**
   * 压缩后的图片高度。
   */
  height?: number,
  /**
   * 是否允许转换为 JPG。
   */
  allowJPG?: boolean,
  /**
   * 是否允许转换为 WebP。设为 'auto' 时，只要当前浏览器支持 WebP，就进行转换。
   */
  allowWebP?: boolean | 'auto',
  /**
   * 是否允许转换为 AVIF。
   */
  allowAVIF?: boolean
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
 * 如果指定图片 URL 的域名是 OSS 域名，且没有任何 OSS 处理参数，则根据压缩选项追加 OSS 图片压缩处理参数。
 * @param url 指定图片 URL。
 * @param options 压缩选项。
 * @returns 处理后的图片 URL。
 * @example
 * ```javascript
 * ossCompress(url, {
 *   width: 300,
 *   allowWebp: true
 * });
 * ```
 */
export function ossCompress(
  url: string, options: IOSSCompressOptions
): string {
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

  if (!urlObj) { return url; }

  // 仅处理 CDN 域名
  if (!/\.videocc\.net$/i.test(urlObj.hostname)) { return url; }

  const filename = (urlObj.pathname.split('/').pop() || '').split('.');
  const extname = filename[filename.length - 1].toLowerCase();

  const ossProcess = genOSSCompressParams(extname, options);
  if (ossProcess) {
    urlObj.search = setOSSCompressParams(urlObj.search, ossProcess);
  }

  return urlObj.href;
}

/**
 * 对指定 HTML 代码中 img 标签的图片地址做 OSS 压缩处理。
 * @param html 指定 HTML 代码。
 * @param options 压缩选项。
 * @returns 处理后的 HTML 代码。
 */
export function compressHTMLImgs(
  html: string,
  options: IOSSCompressOptions
): string {
  if (!html) { return ''; }
  return html.replace(
    /(<img.*?\ssrc=)(["']?)(.+?)\2(.*?>)/gi,
    (match, before, quot, src, after) => {
      return before + '"' + ossCompress(src, options) + '"' + ' data-src="' + src + '"' + after;
    },
  );
}
