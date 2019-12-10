/**
 * 本模块提供字符串处理相关方法。
 * @module string
 */

import { extend } from './lang';

/**
 * 获取字符串长度（非英文字符按2算）。
 * @author luoliquan
 * @param {string} str 字符串。
 * @param {number} [mode=2] 非英文字符按多少个字符算。
 * @return {number} 字符串长度。
 * @example
 * strLen('abcde;'); // 6
 * strLen('abc测试；'); // 9
 * strLen('abc测试；', 1); // 6
 */
export function strLen(str, mode) {
  mode = Number(mode) || 2;
  let result = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    result += str.charCodeAt(i) > 255 ? mode : 1;
  }
  return result;
}

/**
 * 如果目标字符串超出限制长度，则进行截断并拼接省略符号；否则返回目标字符串。
 * @author luoliquan
 * @param {string} str 目标字符串。
 * @param {number} length 限制的长度。
 * @param {Object} [options] 其他设置。
 *   @param {number} [options.mode=2] 非英文字符按多少个字符算。
 *   @param {string} [options.ellipsis='...'] 省略符号。
 * @return {string} 截断后的字符串。
 * @example
 * cutStr('测试一下', 5); // '测试...'
 * cutStr('测试一下', 8); // '测试一下'
 */
export function cutStr(str, length, options) {
  options = extend({
    ellipsis: '...'
  }, options);
  options.mode = Math.max(Number(options.mode) || 2, 1);

  str = String(str);
  const len = strLen(str, options.mode);

  // 未超出长度，直接返回传入的字符串
  if (len <= length) { return str; }

  // 减去省略符长度
  length -= strLen(options.ellipsis, options.mode);

  let result = '', i = -1;
  while (length > 0 && ++i < len) {
    length -= str.charCodeAt(i) > 255 ? options.mode : 1;
    if (length >= 0) { result += str.charAt(i); }
  }

  result += options.ellipsis;

  return result;
}

/**
 * 把指定字符串中的 HTML 预留字符替换成 HTML 实体。
 * @author luoliquan
 * @param {string} str 指定字符串。
 * @return {string} 替换后的字符串。
 */
export function escapeHTML(str) {
  if (str == null) { return str; }
  const map = {
    '"': '&quot;',
    '\'': '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  };
  return String(str).replace(/["'&<>]/g, (match) => {
    return map[match];
  });
}

/**
 * 移除指定字符串中的 HTML 标签。
 * @param {string} str 指定字符串。
 * @return {string} 处理后的字符串。
 */
export function removeTags(str) {
  if (str == null) { return str; }
  return String(str).replace(/<.+?>/g, '');
}

/**
 * 把指定字符串中的换行符替换成 &lt;br /&gt;。
 * @param {string} str 指定字符串。
 * @return {string} 替换后的字符串。
 */
export function nl2br(str) {
  if (str == null) { return str; }
  return String(str).replace(/\r?\n/g, '<br />');
}
