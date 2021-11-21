/**
 * 本模块提供布尔值处理相关方法。
 * @module boolean
 */

/**
 * Y 或者 N。
 */
export type YOrN = 'Y' | 'N';


/**
 * 布尔值转换为 Y 或者 N。
 * @param value 布尔值。
 * @return Y 或者 N。
 */
export function boolToYN(value: boolean): YOrN {
  if (typeof value !== 'boolean') {
    throw new Error('The value argument must be a boolean type');
  }
  return value ? 'Y' : 'N';
}

/**
 * Y 或者 N 转换为布尔值。
 * @param value Y 或者 N。
 * @param defaultValue 当 value 为非法值时的默认值。
 * @return 布尔值。
 */
export function ynToBool(value: YOrN, defaultValue?: YOrN): boolean {
  let upperValue = String(value).toUpperCase();
  if (upperValue !== 'Y' && upperValue !== 'N') {
    if (defaultValue != null) {
      upperValue = String(defaultValue).toUpperCase();
    } else {
      throw new Error('The value argument must be "Y" or "N"');
    }
  }
  return value === 'Y';
}


/**
 * 检查指定数组元素的值是否都为 Y。
 * @param values 指定数组。
 * @return 指定数组元素的值是否都为 Y。
 */
export function allY(values: YOrN[]): boolean {
  return values.every(function(value) {
    return ynToBool(value);
  });
}

/**
 * 检查指定数组元素的值是否至少有一个为 Y。
 * @param values 指定数组。
 * @return 指定数组元素的值是否至少有一个为 Y。
 */
export function someY(values: YOrN[]): boolean {
  return values.some(function(value) {
    return ynToBool(value);
  });
}

/**
 * 检查指定数组元素的值是否都为 N。
 * @param values 指定数组。
 * @return 指定数组元素的值是否都为 N。
 */
export function allN(values: YOrN[]): boolean {
  return values.every(function(value) {
    return !ynToBool(value);
  });
}

/**
 * 检查指定数组元素的值是否至少有一个为 N。
 * @param values 指定数组。
 * @return 指定数组元素的值是否至少有一个为 N。
 */
export function someN(values: YOrN[]): boolean {
  return values.some(function(value) {
    return !ynToBool(value);
  });
}
