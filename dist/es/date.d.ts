/**
 * 本模块提供日期和时间处理的相关方法。
 * @packageDocumentation
 */
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
export declare function formatDate(date: number | Date, formation: string): string;
/**
 * 秒数格式化配置。
 */
export interface FormatSecondsOptions {
    /**
     * 段数，2 或者 3。
     * 为 3 时，格式化样式为「时:分:秒」。
     * 为 2 时，格式化样式为「分:秒」。
     */
    segments?: number;
    /**
     * 每一段数字的最小位数，不足位数时补 0。
     */
    digits?: number;
}
/**
 * 把秒数格式化成“时:分:秒”格式。
 * @param secs 秒数。
 * @param options 格式化配置。
 * @return 格式化结果。
 * @example
 * ```javascript
 * formatSeconds(3682); // '61:22'
 * formatSeconds(82); // '01:22'
 * formatSeconds(82, { segments: 3 }); // '00:01:22'
 * formatSeconds(3682, { segments: 3, digits: 1 }); // '1:1:22'
 * ```
 */
export declare function formatSeconds(secs: number, options?: FormatSecondsOptions): string;
