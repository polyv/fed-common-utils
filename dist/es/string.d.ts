/**
 * 本模块提供字符串处理相关方法。
 * @packageDocumentation
 */
/**
 * 计算字符串长度的选项。
 */
export interface IStrLenOptions {
    /**
     * 英文字符单位长度。
     */
    enLen?: number;
    /**
     * 非英文字符单位长度。
     */
    nonEnLen?: number;
}
/**
 * 裁剪字符串的选项。
 */
export interface ICutStrOptions extends IStrLenOptions {
    /**
     * 省略符，默认为三个点号。
     */
    ellipsis?: string;
}
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
export declare function strLen(str: string, options?: number | IStrLenOptions): number;
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
export declare function cutStr(str: string, length: number, options?: ICutStrOptions): string;
/**
 * 把指定字符串中的 HTML 预留字符替换成 HTML 实体。
 * @param str 指定字符串。
 * @return 替换后的字符串。
 */
export declare function escapeHTML(str: string): string;
/**
 * 把指定字符串中的 HTML 实体替换成 HTML 预留字符。
 * @param str 指定字符串。
 * @return 替换后的字符串。
 */
export declare function unescapeHTML(str: string): string;
/**
 * 移除指定字符串中的 HTML 标签。
 * @param str 指定字符串。
 * @return 处理后的字符串。
 */
export declare function removeTags(str: string): string;
/**
 * 把指定字符串中的换行符替换成 &lt;br /&gt;。
 * @param str 指定字符串。
 * @return 替换后的字符串。
 */
export declare function nl2br(str: string): string;
/**
 * 生成随机字符串。
 * @param length 字符串长度。
 * @param prefix 字符串前缀（不计入长度）。
 * @returns 生成的随机字符串。
 */
export declare function randomStr(length: number, prefix?: string): string;
/**
 * 生成 uuid(v4)。
 * @returns uuid。
 */
export declare function uuidV4(): string;
/**
 * 版本号对比。
 * @param versionA 待比较版本 A。
 * @param versionB 待比较版本 B。
 * @return 大于 0 时，表示版本 A 大于版本 B；
 *   小于 0 时，表示版本 B 大于版本 A；
 *   等于 0 时，表示两个版本号一致。
 */
export declare function compareVersions(verA: string, verB: string): number;
