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
export function hexToRGB(hex: string): [number, number, number] | null {
  const matchResult = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) ||
    /^#([a-f\d])([a-f\d])([a-f\d])$/.exec(hex);
  if (!matchResult) { return null; }

  return [
    matchResult[1],
    matchResult[2],
    matchResult[3],
  ].map((item) => {
    return parseInt(item.length === 1 ? item + item : item, 16);
  }) as [number, number, number];
}
