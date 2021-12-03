"use strict";
/**
 * 本模块提供数据验证方法。
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmail = exports.isChsPhoneNO = void 0;
/**
 * 检查目标字符串是否中国大陆手机号。
 * @param str 目标字符串。
 * @return 目标字符串是否中国大陆手机号。
 * @example
 * ```javascript
 * isChsPhoneNO('13800138000'); // true
 * isChsPhoneNO('a13800138000c'); // false
 * ```
 */
function isChsPhoneNO(str) {
    return /^1[3-9]\d{9}$/.test(str);
}
exports.isChsPhoneNO = isChsPhoneNO;
/**
 * 检查目标字符串是否电子邮箱地址。
 * @param str 目标字符串。
 * @return 目标字符串是否电子邮箱地址。
 * @example
 * ```javascript
 * isEmail('me@polyv.net'); // true
 * isEmail('me@polyv_.net-'); // false
 * ```
 */
function isEmail(str) {
    var canMatch = /^[\w-]+(?:\.[\w-]+)*@[\w-]+(?:\.[\w-]+)*\.[a-zA-Z]{2,}$/.test(str);
    if (canMatch) {
        var temp = str.replace('@', '.').split('.');
        for (var i = temp.length - 1; i >= 0; i--) {
            // 每一段的开头和结尾都不能是连字符或下划线
            if (/^[-_]/.test(temp[i]) || /[_-]$/.test(temp[i])) {
                return false;
            }
        }
        return true;
    }
    else {
        return false;
    }
}
exports.isEmail = isEmail;
