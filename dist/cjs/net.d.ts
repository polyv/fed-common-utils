/**
 * 本模块提供网络协议相关方法。
 * @packageDocumentation
 */
/**
 * 检查目标字符串是否以特定 URL 协议开头。
 * @param str 目标字符串。
 * @param protocols 特定协议（不含冒号和斜杠），不指定时表示允许任何协议。
 * @return 目标字符串是否以特定 URL 协议开头。
 * @example
 * ```javascript
 * startsWithProtocol('//abc.com'); // true
 * startsWithProtocol('https://abc.com'); // true
 * startsWithProtocol('file:///Users/'); // true
 * startsWithProtocol('abc.com'); // false
 * startsWithProtocol('http://abc.com', ['http', 'https']); // true
 * startsWithProtocol('ftp://abc.com', ['http', 'https']); // false
 * ```
 */
export declare function startsWithProtocol(str: string, protocols?: string[]): boolean;
/**
 * 替换目标字符串中的 URL 协议。如果字符串中不包含协议，则加上协议。
 * @param url 目标字符串。
 * @param protocol 协议。
 * @return 替换结果。
 * @example
 * ```javascript
 * changeProtocol('abc.com', 'https'); // 'https://abc.com'
 * changeProtocol('http://abc.com', 'https'); // 'https://abc.com'
 * ```
 */
export declare function changeProtocol(url: string, protocol: string): string;
