/**
 * 本模块提供布尔值处理相关方法。
 * @module boolean
 */

/**
 * 布尔值转换为 Y 或者 N。
 * @author tanyuqin
 * @param {boolean} value 布尔值。
 * @return {string} Y 或者 N。
 */
export function boolToYN(value) {
  if (typeof value !== 'boolean') {
    throw new Error('The value argument must be a boolean type');
  }
  return value ? 'Y' : 'N';
}

/**
 * Y 或者 N 转换为布尔值。
 * @author tanyuqin
 * @param {string} value Y 或者 N。
 * @return {boolean} 布尔值。
 */
export function ynToBool(value) {
  value = String(value).toUpperCase();
  if (value !== 'Y' && value !== 'N') {
    throw new Error('The value argument must be "Y" or "N"');
  }
  return value === 'Y';
}
