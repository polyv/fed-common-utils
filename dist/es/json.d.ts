/**
 * 本模块提供基础方法。
 * @packageDocumentation
 */
/**
 * 深度克隆指定对象（仅限 JSON 支持的数据类型）。
 * @param obj 指定对象。
 * @return 克隆结果。
 * @example
 * ```javascript
 * cloneJSON({ a: 1, b: 2 }); // { a: 1, b: 2 }
 * ```
 */
export declare function cloneJSON(obj: unknown): any;
/**
 * 尝试把指定字符串解析为 JSON 对象。
 * @author luoliquan
 * @param {string} str 指定字符串。
 * @param {Function} [onError] 解析出错时执行的函数。
 * @return {Any} 解析结果，解析失败时返回 undefined。
 * @example
 * ```javascript
 * tryParseJSON('ss&&**'); // undefined
 * tryParseJSON('{"a": 1}'); // { a: 1 }
 * ```
 */
export declare function tryParseJSON(str: string, onError: (e: Error) => void): unknown;
