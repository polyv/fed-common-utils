/**
 * 本模块提供 cookie 读写方法。
 * @module cookie
 */

import { addToDate } from './internal/timeunit';

/**
 * 写入 cookie。
 * @author luoliquan
 * @param {string} key cookie 键。
 * @param {string} value cookie 值。
 * @param {Object} [options] 参数。
 *   @param {string} [options.domain] 所在域。
 *   @param {string} [options.path] 所在路径。
 *   @param {(Date|number|string)} [options.expires] 过期时间。
 *     为日期类型时表示绝对时间；
 *     为数字（单位毫秒）时表示相对时间（当前时间+相对值）；
 *     为字符串时表示相对时间（当前时间+相对值），支持格式包括（%表示数字）：
 *       %secs，
 *       %mins，
 *       %hours，
 *       %days，
 *       %months，
 *       %years。
 *   @param {boolean} [options.secure] 是否只在 https 连接中有效。
 * @example
 * cookie.set('a', '1')
 * cookie.set('b', '2', {
 *   expires: '6months', // 180 天
 *   domain: '.polyv.net',
 *   path: '/'
 * });
 */
export function set(key, value, options) {
  options = options || {};

  let content = encodeURIComponent(key) + '=' + encodeURIComponent(value);
  if (options.expires != null) {
    content += '; expires=' + (
      options.expires instanceof Date ?
        options.expires :
        addToDate(new Date(), options.expires)
    ).toUTCString();
  }
  if (options.path) { content += '; path=' + options.path; }
  if (options.domain) { content += '; domain=' + options.domain; }
  if (options.secure === true) { content += '; secure'; }

  document.cookie = content;
}

/**
 * 读取 cookie。
 * @author luoliquan
 * @param {string} name cookie 名。
 * @return {string} cookie 值。
 * @example
 * cookie.get('a');
 */
export function get(key) {
  key = '; ' + encodeURIComponent(key) + '=';
  const cookie = '; ' + document.cookie;

  let beginPos = cookie.indexOf(key);
  if (beginPos === -1) { return null; }
  beginPos += key.length;

  let endPos = cookie.indexOf(';', beginPos);
  if (endPos === -1) { endPos = cookie.length; }

  return decodeURIComponent(cookie.substring(beginPos, endPos));
}

// iOS 9 下设置过期不会马上生效，先设为空
const shouldSetEmptyBeforeRemove = (function() {
  // 兼容 Node 端（主要针对同构应用）引入
  if (typeof document === 'undefined') { return false; }

  const TEST_KEY = '__jraiser__test__cookie__';
  document.cookie = TEST_KEY + '=1';
  document.cookie = TEST_KEY + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  return !!get(TEST_KEY);
})();

/**
 * 移除 cookie。
 * @author luoliquan
 * @param {string} name cookie 名。
 * @param {Object} [options] 参数。
 *   @param {string} [options.domain] 所在域。
 *   @param {string} [options.path] 所在路径。
 * @example
 * remove('a');
 * remove('b' {
 *   domain: '.polyv.net',
 *   path: '/abc'
 * })
 */
export function remove(name, options) {
  if (shouldSetEmptyBeforeRemove) { set(name, '', options); }

  options = options || {};
  // 让其过期即为删除
  options.expires = new Date(0);
  set(name, '', options);
}
