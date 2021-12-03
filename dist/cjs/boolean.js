"use strict";
/**
 * 本模块提供布尔值处理相关方法。
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.someN = exports.allN = exports.someY = exports.allY = exports.ynToBool = exports.boolToYN = void 0;
/**
 * 布尔值转换为 Y 或者 N。
 * @param value 布尔值。
 * @return Y 或者 N。
 */
function boolToYN(value) {
    if (typeof value !== 'boolean') {
        throw new Error('The value argument must be a boolean type');
    }
    return value ? 'Y' : 'N';
}
exports.boolToYN = boolToYN;
/**
 * Y 或者 N 转换为布尔值。
 * @param value Y 或者 N。
 * @param defaultValue 当 value 为非法值时的默认值。
 * @return 布尔值。
 */
function ynToBool(value, defaultValue) {
    var upperValue = String(value).toUpperCase();
    if (upperValue !== 'Y' && upperValue !== 'N') {
        if (defaultValue != null) {
            upperValue = String(defaultValue).toUpperCase();
        }
        else {
            throw new Error('The value argument must be "Y" or "N"');
        }
    }
    return upperValue === 'Y';
}
exports.ynToBool = ynToBool;
/**
 * 检查指定数组元素的值是否都为 Y。
 * @param values 指定数组。
 * @return 指定数组元素的值是否都为 Y。
 */
function allY(values) {
    return values.every(function (value) {
        return ynToBool(value);
    });
}
exports.allY = allY;
/**
 * 检查指定数组元素的值是否至少有一个为 Y。
 * @param values 指定数组。
 * @return 指定数组元素的值是否至少有一个为 Y。
 */
function someY(values) {
    return values.some(function (value) {
        return ynToBool(value);
    });
}
exports.someY = someY;
/**
 * 检查指定数组元素的值是否都为 N。
 * @param values 指定数组。
 * @return 指定数组元素的值是否都为 N。
 */
function allN(values) {
    return values.every(function (value) {
        return !ynToBool(value);
    });
}
exports.allN = allN;
/**
 * 检查指定数组元素的值是否至少有一个为 N。
 * @param values 指定数组。
 * @return 指定数组元素的值是否至少有一个为 N。
 */
function someN(values) {
    return values.some(function (value) {
        return !ynToBool(value);
    });
}
exports.someN = someN;
