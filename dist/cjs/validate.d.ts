/**
 * 本模块提供数据验证方法。
 * @packageDocumentation
 */
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
export declare function isChsPhoneNO(str: string): boolean;
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
export declare function isEmail(str: string): boolean;
