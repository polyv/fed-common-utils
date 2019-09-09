/**
 * 本模块提供网络协议相关方法。
 * @module net
 */

// 匹配协议
const reProtocol = /^(?:([a-z]+):)?\/{2,3}/i;

/**
 * 检查目标字符串是否以特定 URL 协议开头。
 * @author luoliquan
 * @param {string} str 目标字符串。
 * @param {Array} [protocols] 特定协议（不含冒号和斜杠），不指定时表示允许任何协议。
 * @return {boolean} 目标字符串是否以特定 URL 协议开头。
 * @example
 * startsWithProtocol('//abc.com'); // true
 * startsWithProtocol('https://abc.com'); // true
 * startsWithProtocol('file:///Users/'); // true
 * startsWithProtocol('abc.com'); // false
 * startsWithProtocol('http://abc.com', ['http', 'https']); // true
 * startsWithProtocol('ftp://abc.com', ['http', 'https']); // false
 */
export function startsWithProtocol(str, protocols) {
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
 * @author luoliquan
 * @param {string} url 目标字符串。
 * @param {string} protocol 协议。
 * @return {string} 替换结果。
 * @example
 * changeProtocol('abc.com', 'https'); // 'https://abc.com'
 * changeProtocol('http://abc.com', 'https'); // 'https://abc.com'
 */
export function changeProtocol(url, protocol) {
  if (!reProtocol.test(protocol)) {
    protocol += '://';
  }
  return startsWithProtocol(url) ?
    url.replace(reProtocol, protocol) :
    protocol + url;
}
