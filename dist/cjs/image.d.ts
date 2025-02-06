/**
 * 本模块提供图片操作相关方法。
 * @packageDocumentation
 */
/**
 * 检查当前浏览器是否支持 WebP 格式。
 * @returns 当前浏览器是否支持 WebP 格式。
 */
export declare const supportWebP: () => boolean;
/**
 * 检查当前浏览器是否支持 AVIF 格式（注意，本函数是异步函数）。
 * @returns 当前浏览器是否支持 AVIF 格式。
 */
export declare const supportAVIF: () => Promise<boolean>;
/**
 * 压缩选项。
 */
export interface IOSSCompressOptions {
    /**
     * 压缩后的图片宽度。
     */
    width?: number;
    /**
     * 压缩后的图片高度。
     */
    height?: number;
    /**
     * 是否允许转换为 JPG。
     */
    allowJPG?: boolean;
    /**
     * 是否允许转换为 WebP。设为 'auto' 时，只要当前浏览器支持 WebP，就进行转换。
     */
    allowWebP?: boolean | 'auto';
    /**
     * 是否允许转换为 AVIF。
     */
    allowAVIF?: boolean;
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
export declare function ossCompress(url: string, options: IOSSCompressOptions): string;
/**
 * 对指定 HTML 代码中 img 标签的图片地址做 OSS 压缩处理。
 * @param html 指定 HTML 代码。
 * @param options 压缩选项。
 * @returns 处理后的 HTML 代码。
 */
export declare function compressHTMLImgs(html: string, options: IOSSCompressOptions): string;
