/**
 * 本模块提供网络协议相关方法。
 * @packageDocumentation
 */

// 匹配开头的协议
const reProtocol = /^(?:([a-z]+):)?\/{2,3}/i;

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
export function startsWithProtocol(
  str: string, protocols?: string[]
): boolean {
  const result = reProtocol.test(str);
  if (result && protocols) {
    const protocol = (RegExp.$1 || '').toLowerCase();
    for (let i = protocols.length - 1; i >= 0; i--) {
      if (protocol === protocols[i].toLowerCase()) {
        return true;
      }
    }
    return false;
  }
  return result;
}

/**
 * 替换目标字符串中的 URL 协议。如果字符串中不包含协议，则加上协议。
 * @param url 目标字符串。
 * @param protocol 协议（不含冒号和斜杠）。
 * @return 替换结果。
 * @example
 * ```javascript
 * changeProtocol('abc.com', 'https'); // 'https://abc.com'
 * changeProtocol('http://abc.com', 'https'); // 'https://abc.com'
 * ```
 */
export function changeProtocol(url: string, protocol: string): string {
  if (!reProtocol.test(protocol)) {
    protocol += '://';
  }
  return startsWithProtocol(url)
    ? url.replace(reProtocol, protocol)
    : protocol + url;
}

/**
 * 移除指定 URL 中的协议头。
 * @param url 指定 URL。
 * @returns 处理后的字符串。
 * @example
 * ```javascript
 * removeProtocol('https://abc.com/abc.html'); // 'abc.com/abc.html'
 * removeProtocol('abc.com/abc.html'); // 'abc.com/abc.html'
 * ```
 */
export function removeProtocol(url: string): string {
  return url.replace(reProtocol, '');
}

/**
 * 标准化（如果当前页面协议为 http，则为 http，否则为 https）目标字符串中的 URL 协议。
 * @param url 目标字符串。
 * @returns 标准化结果。
 * ```javascript
 * // 当前页面协议为 http 时，结果是 'http://abc.com'
 * // 否则结果是 'https://abc.com'
 * normalizeProtocol('http://abc.com');
 * ```
 */
export function normalizeProtocol(url: string): string {
  return changeProtocol(
    url,
    window.location.protocol === 'http:' ? 'http' : 'https'
  );
}
