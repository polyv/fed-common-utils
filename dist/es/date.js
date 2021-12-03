/**
 * 本模块提供日期和时间处理的相关方法。
 * @packageDocumentation
 */
// 统一返回日期类型
function ensureDate(date) {
    if (typeof date !== 'object') {
        date = new Date(date);
    }
    return date;
}
/**
 * 格式化日期。
 * @param date 日期对象或时间戳（毫秒）。
 * @param formation 格式。
 * @return 格式化结果。
 * @example
 * ```javascript
 * formatDate(new Date(2018, 9, 8, 8, 50, 56), 'YYYY-MM-DD hh:mm:ss'); // '2018-10-08 08:50:56'
 * ```
 */
export function formatDate(date, formation) {
    date = ensureDate(date);
    const values = {
        Y: date.getFullYear(),
        M: date.getMonth() + 1,
        D: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds()
    };
    return formation.replace(/([YMDhms])\1*/g, function (match) {
        let result = values[match[0]].toString();
        const matchLen = match.length;
        if (matchLen > result.length) {
            result = (new Array(matchLen - result.length + 1)).join('0') + result;
        }
        return result;
    });
}
/**
 * 把秒数格式化成“时:分:秒”格式。
 * @param secs 秒数。
 * @param options 格式化配置。
 * @return 格式化结果。
 * @example
 * ```javascript
 * formatSeconds(3682); // '01:01:22'
 * formatSeconds(82); // '01:22'
 * formatSeconds(82, { segments: 3 }); // '00:01:22'
 * formatSeconds(3682, { digits: 1 }); // '1:1:22'
 * ```
 */
export function formatSeconds(secs, options = { segments: 2, digits: 2 }) {
    secs = Number(secs);
    if (isNaN(secs) || secs < 0) {
        throw new Error('"secs" must be a positive integer');
    }
    let segments = (options.segments || 2) | 0;
    let digits = (options.digits || 2) | 0;
    // 位数最小为 1
    digits = Math.max(1, digits);
    // 段数只能为 2 或者 3
    if ([2, 3].indexOf(segments) === -1) {
        segments = 2;
    }
    // 需要补多少个 0
    const zeros = new Array(digits + 1).join('0');
    const result = [
        60 * 60,
        60,
        1
    ].map((num) => {
        const subResult = Math.floor(secs / num);
        const len = subResult.toString().length;
        secs = secs % num;
        return (zeros + subResult).slice(-Math.max(len, digits));
    });
    if (segments < 3 && !Number(result[0])) {
        result.shift();
    }
    return result.join(':');
}
