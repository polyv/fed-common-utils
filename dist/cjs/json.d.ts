/**
 * 本模块提供 json 处理相关方法。
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
 * JSON 字符串解析失败时的回调。
 */
export interface IErrorCallback<T> {
    (e: Error): void | null | T;
}
/**
 * 尝试把指定字符串解析为 JSON 对象。
 * @param str 指定字符串。
 * @param onError 解析出错时执行的回调函数。函数返回值会作为解析失败时的解析结果。
 * @return 解析结果。
 * @example
 * ```javascript
 * tryParseJSON('ss&&**'); // undefined
 * tryParseJSON('{"a": 1}'); // { a: 1 }
 * ```
 */
export declare function tryParseJSON<T>(str: string, onError?: IErrorCallback<T>): T | null;
/**
 * 尝试把指定字符串解析为 JSON 对象。
 * @param str 指定字符串。
 * @param defaultValue 解析出错时的默认结果。
 * @return 解析结果。
 * @example
 * ```javascript
 * tryParseJSON('12&&**', 1); // 1
 * ```
 */
export declare function tryParseJSON<T>(str: string, defaultValue?: T): T | null;
