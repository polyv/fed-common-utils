/**
 * 本模块提供图片操作相关方法。
 * @packageDocumentation
 */

/**
 * 检查当前浏览器是否支持 WebP 格式。
 * @returns 当前浏览器是否支持 WebP 格式。
 */
export function supportWebP(): boolean {
  const elem = document.createElement('canvas');
  if (elem.getContext && elem.getContext('2d')) {
    const mimeType = 'image/webp';
    return elem.toDataURL(mimeType).indexOf('data:' + mimeType) === 0;
  }
  return false;
}

/**
 * 检查当前浏览器是否支持 AVIF 格式（注意，本函数是异步函数）。
 * @returns 当前浏览器是否支持 AVIF 格式。
 */
export function supportAVIF(): Promise<boolean> {
  return new Promise((resolve) => {
    const avif = new Image();
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';

    avif.onerror = () => { resolve(false); };
    avif.onload = () => { resolve(true); };
    // 避免长时间不触发前面两个事件
    setTimeout(() => { resolve(false); }, 1000);
  });
}

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
   * 是否允许转换为 WebP。
   */
  allowWebP?: boolean,
  /**
   * 是否允许转换为 AVIF。
   */
  allowAVIF?: boolean
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
  const a = document.createElement('a');
  a.href = url;
  const search = a.search;
  // IE 下 https 的 url，host 包含端口号，因此要取 hostname
  const hostname = a.hostname.toLowerCase();

  // 仅处理特定域名以及没有进行过 OSS 处理的 URL
  if (
    hostname !== 'liveimages.videocc.net' ||
    /(?:\?|&)x-oss-process(?:=|&|$)/.test(search)
  ) {
    return url;
  }

  let ossProccess = '';
  if (options.width != null || options.height != null) {
    ossProccess += '/resize,mfit';
    if (options.width) { ossProccess += ',w_' + options.width; }
    if (options.height) { ossProccess += ',h_' + options.height; }
    ossProccess += ',limit_1';
  }
  if (options.allowAVIF) {
    ossProccess += '/format,avif';
  } else if (options.allowWebP) {
    ossProccess += '/format,webp';
  }

  if (ossProccess) {
    ossProccess = 'x-oss-process=image' + ossProccess;
    url += (url.indexOf('?') === -1 ? '?' : '&') + ossProccess;
  }

  return url;
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
