/**
 * 本模块提供图片操作相关方法。
 * @packageDocumentation
 */
/**
 * 检查当前浏览器是否支持 WebP 格式。
 * @returns 当前浏览器是否支持 WebP 格式。
 */
export declare function supportWebP(): boolean;
/**
 * 检查当前浏览器是否支持 AVIF 格式（注意，本函数是异步函数）。
 * @returns 当前浏览器是否支持 AVIF 格式。
 */
export declare function supportAVIF(): Promise<boolean>;
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
     * 是否允许转换为 WebP。
     */
    allowWebP?: boolean;
    /**
     * 是否允许转换为 AVIF。
     */
    allowAVIF?: boolean;
}
/**
 * 如果指定图片 URL 的域名是 OSS 域名，则追加 OSS 图片压缩参数。
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
