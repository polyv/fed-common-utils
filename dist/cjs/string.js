"use strict";
/**
 * 本模块提供字符串处理相关方法。
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareVersions = exports.uuidV4 = exports.randomStr = exports.nl2br = exports.removeTags = exports.escapeHTML = exports.cutStr = exports.strLen = void 0;
/**
 * 计算字符串长度。默认情况下，英文字符的单位长度为 1，非英文字符的单位长度为 2。
 * @param str 字符串。
 * @param options 为数字时表示非英文字符单位长度（此时英文字符单位长度为 1）；为 Object 时表示选项。
 * @return 字符串长度。
 * @example
 * ```javascript
 * strLen('abcde;'); // 6
 * strLen('abc测试；'); // 9
 * strLen('abc测试；', 1); // 6
 * strLen('abc测试；', { enLen: 0.5, nonEnLen: 1 }); // 4.5
 * ```
 */
function strLen(str, options) {
    var _a, _b;
    if (typeof options === 'number') {
        options = {
            enLen: 1,
            nonEnLen: options
        };
    }
    else {
        options = options || {};
        options.enLen = (_a = options.enLen) !== null && _a !== void 0 ? _a : 1;
        options.nonEnLen = (_b = options.nonEnLen) !== null && _b !== void 0 ? _b : 2;
    }
    var result = 0;
    for (var i = str.length - 1; i >= 0; i--) {
        result += str.charCodeAt(i) > 255 ?
            (options.nonEnLen || 0) :
            (options.enLen || 0);
    }
    return result;
}
exports.strLen = strLen;
/**
 * 如果目标字符串超出限制长度，则进行截断并拼接省略符号；否则返回目标字符串。
 * 默认情况下，英文字符的单位长度为 1，非英文字符的单位长度为 2。
 * @param str 目标字符串。
 * @param length 限制的长度。
 * @param options 选项。
 * @return 截断后的字符串。
 * @example
 * ```javascript
 * cutStr('测试一下', 5); // '测试...'
 * cutStr('测试一下', 8); // '测试一下'
 * curStr('1测试2测试3', 3.5, { enLen: 0.5, nonEnLen: 1 }); // 1测...
 * ```
 */
function cutStr(str, length, options) {
    options = options || {};
    options.enLen = Number(options.enLen) || 1;
    options.nonEnLen = Number(options.nonEnLen) || 2;
    options.ellipsis = options.ellipsis || '...';
    str = String(str);
    var len = strLen(str, options);
    // 未超出长度，直接返回传入的字符串
    if (len <= length) {
        return str;
    }
    // 减去省略符长度
    length -= strLen(options.ellipsis, options);
    var result = '', i = -1;
    while (length > 0 && ++i < len) {
        length -= str.charCodeAt(i) > 255 ? options.nonEnLen : options.enLen;
        if (length >= 0) {
            result += str.charAt(i);
        }
    }
    result += options.ellipsis;
    return result;
}
exports.cutStr = cutStr;
/**
 * 把指定字符串中的 HTML 预留字符替换成 HTML 实体。
 * @param str 指定字符串。
 * @return 替换后的字符串。
 */
function escapeHTML(str) {
    if (str == null) {
        return str;
    }
    var map = {
        '"': '&quot;',
        '\'': '&#39;',
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };
    return String(str).replace(/["'&<>]/g, function (match) {
        return map[match];
    });
}
exports.escapeHTML = escapeHTML;
/**
 * 移除指定字符串中的 HTML 标签。
 * @param str 指定字符串。
 * @return 处理后的字符串。
 */
function removeTags(str) {
    if (str == null) {
        return '';
    }
    return String(str).replace(/<.+?>/g, '');
}
exports.removeTags = removeTags;
/**
 * 把指定字符串中的换行符替换成 &lt;br /&gt;。
 * @param str 指定字符串。
 * @return 替换后的字符串。
 */
function nl2br(str) {
    if (str == null) {
        return str;
    }
    return String(str).replace(/\r?\n/g, '<br />');
}
exports.nl2br = nl2br;
/**
 * 生成随机字符串。
 * @param length 字符串长度。
 * @param [prefix] 字符串前缀（不计入长度）。
 * @returns 生成的随机字符串。
 */
function randomStr(length, prefix) {
    length = length | 0;
    if (!length || length < 0) {
        throw new Error('"length" must be a number greater than 0');
    }
    var result = '';
    do {
        result += Math.random().toString(36).substr(2);
    } while (result.length < length);
    // 拼接的长度可能大于指定长度，进行裁剪
    result = result.substr(0, length);
    if (prefix != null) {
        result = prefix + result;
    }
    return result;
}
exports.randomStr = randomStr;
/**
 * 生成 uuid(v4)。
 * @returns uuid。
 */
function uuidV4() {
    var ts = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        ts += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (match) {
        var r = (ts + Math.random() * 16) % 16 | 0;
        ts = Math.floor(ts / 16);
        return (match === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
exports.uuidV4 = uuidV4;
/**
 * 版本号对比。
 * @param versionA 待比较版本 A。
 * @param versionB 待比较版本 B。
 * @return 大于 0 时，表示版本 A 大于版本 B；
 *   小于 0 时，表示版本 B 大于版本 A；
 *   等于 0 时，表示两个版本号一致。
 */
function compareVersions(verA, verB) {
    if (!verA || !verB) {
        throw new Error('Please specify both verA and verB');
    }
    var reg = /(\.0+)+$/; // 去掉末尾的 .000
    var verAParts = String(verA).replace(reg, '').split('.');
    var verBParts = String(verB).replace(reg, '').split('.');
    var len = Math.min(verAParts.length, verBParts.length);
    for (var i = 0; i < len; i++) {
        var diff = parseInt(verAParts[i]) - parseInt(verBParts[i]);
        if (diff) {
            return diff;
        }
    }
    return verAParts.length - verBParts.length;
}
exports.compareVersions = compareVersions;
