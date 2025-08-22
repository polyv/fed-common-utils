/**
 * 本模块提供颜色处理相关方法。
 * @packageDocumentation
 */
/**
 * 将十六进制的颜色转换成 r、g、b 格式数组
 * @param hex 十六进制的颜色
 * @returns r、g、b 格式数组
 * @example
 * ```javascript
 * hexToRGB('#f00'); // [255, 0, 0]
 * hexToRGB('#ffff00'); // [255, 255, 0]
 * ```
 */
export declare function hexToRGB(hex: string): [number, number, number] | null;
