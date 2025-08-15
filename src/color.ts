/**
 * 本模块提供颜色处理相关方法。
 * @packageDocumentation
 */

/**
 * 将十六进制的颜色转换成 r、g、b 格式数组
 * @param hex 十六进制的颜色
 * @returns r、g、b 格式数组
 * @example
 * ```typescript
 * const rgb = hexToRGB('#000000');
 * console.log(rgb); // [0, 0, 0]
 * ```
 */
export function hexToRGB(hex: string): [number, number, number] {
  let r = 0;
  let g = 0;
  let b = 0;

  if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }

  if (hex.length === 4) {
    r = parseInt(hex.slice(1, 2), 16);
    g = parseInt(hex.slice(2, 3), 16);
    b = parseInt(hex.slice(3, 4), 16);
  }

  return [r, g, b];
}
