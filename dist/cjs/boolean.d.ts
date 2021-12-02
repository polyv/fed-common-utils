/**
 * 本模块提供布尔值处理相关方法。
 * @packageDocumentation
 */
/**
 * Y 或者 N。
 */
export declare type YOrN = 'Y' | 'N';
/**
 * 布尔值转换为 Y 或者 N。
 * @param value 布尔值。
 * @return Y 或者 N。
 */
export declare function boolToYN(value: boolean): YOrN;
/**
 * Y 或者 N 转换为布尔值。
 * @param value Y 或者 N。
 * @param defaultValue 当 value 为非法值时的默认值。
 * @return 布尔值。
 */
export declare function ynToBool(value: YOrN, defaultValue?: YOrN): boolean;
/**
 * 检查指定数组元素的值是否都为 Y。
 * @param values 指定数组。
 * @return 指定数组元素的值是否都为 Y。
 */
export declare function allY(values: YOrN[]): boolean;
/**
 * 检查指定数组元素的值是否至少有一个为 Y。
 * @param values 指定数组。
 * @return 指定数组元素的值是否至少有一个为 Y。
 */
export declare function someY(values: YOrN[]): boolean;
/**
 * 检查指定数组元素的值是否都为 N。
 * @param values 指定数组。
 * @return 指定数组元素的值是否都为 N。
 */
export declare function allN(values: YOrN[]): boolean;
/**
 * 检查指定数组元素的值是否至少有一个为 N。
 * @param values 指定数组。
 * @return 指定数组元素的值是否至少有一个为 N。
 */
export declare function someN(values: YOrN[]): boolean;
