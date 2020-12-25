/**
 * 本模块提供浏览器检测相关方法。
 * @module browser
 */

// 默认获取浏览器 useragent
function getBrowserUA(ua) {
  if (!ua && typeof navigator !== 'undefined') {
    ua = navigator.userAgent;
  }
  return ua;
}

/**
 * 检查指定 useragent 字符串是否符合移动端设备特征。
 * @author luoliquan
 * @param {string} [ua] useragent 字符串，浏览器环境下默认为 navigator.userAgent。
 * @return {boolean} 是否符合移动端设备特征。
 */
export function isMobile(ua) {
  ua = getBrowserUA(ua);
  return /mobile|android/i.test(ua) || !/\b(Windows\sNT|Macintosh|Linux)\b/.test(ua);
}

/**
 * 检查指定 useragent 字符串是否符合微信客户端特征。
 * @author luoliquan
 * @param {string} [ua] useragent 字符串，浏览器环境下默认为 navigator.userAgent。
 * @return {boolean} 是否符合微信客户端特征。
 */
export function isWeixin(ua) {
  ua = getBrowserUA(ua);
  return /\bMicroMessenger\//.test(ua);
}

/**
 * 获取指定 useragent 字符串中的微信版本号。
 * @param {string} [ua] useragent 字符串，浏览器环境下默认为 navigator.userAgent。
 * @return {string} 微信版本号，不符合微信特征时返回空字符串。
 */
export function weixinVersion(ua) {
  ua = getBrowserUA(ua);
  return /\bMicroMessenger\/([\d.]+)/.test(ua) ? RegExp.$1 : '';
}

/**
 * 检查指定 useragent 字符串是否符合企业微信客户端特征。
 * @author luoliquan
 * @param {string} [ua] useragent 字符串，浏览器环境下默认为 navigator.userAgent。
 * @return {boolean} 字符串是否符合企业微信客户端特征。
 */
export function isWorkWeixin(ua) {
  ua = getBrowserUA(ua);
  return isWeixin(ua) && /\bwxwork\b/.test(ua);
}

/**
 * 获取指定 useragent 字符串中的 IE 浏览器版本号。
 * @author luoliquan
 * @param {string} [ua] useragent 字符串，浏览器环境下默认为 navigator.userAgent。
 * @return {string} IE 浏览器版本号，不符合该浏览器特征时返回空字符串。
 */
export function ieVersion(ua) {
  ua = getBrowserUA(ua);
  return /\bMSIE\s(\d+)/i.test(ua) || /\bTrident\/.*;\srv:(\d+)/.test(ua) ?
    RegExp.$1 : '';
}

/**
 * 检查指定 useragent 字符串是否符合安卓系统特征。
 * @author luoliquan
 * @param {string} [ua] useragent 字符串，浏览器环境下默认为 navigator.userAgent。
 * @return {boolean} 是否符合安卓系统特征。
 */
export function isAndroid(ua) {
  ua = getBrowserUA(ua);
  return /\bAndroid\b/.test(ua);
}

/**
 * 检查指定 useragent 字符串是否符合 iOS 系统特征。
 * @author luoliquan
 * @param {string} [ua] useragent 字符串，浏览器环境下默认为 navigator.userAgent。
 * @return {boolean} 是否符合 iOS 系统特征。
 */
export function isIOS(ua) {
  ua = getBrowserUA(ua);
  return /\b(?:iPad|iPod|iPhone)\b/.test(ua);
}

/**
 * 获取指定 useragent 字符串中的 iOS 版本号。
 * @param {string} [ua] useragent 字符串，浏览器环境下默认为 navigator.userAgent。
 * @return {string} iOS 版本号，不符合该系统特征时返回空字符串。
 */
export function iOSVersion(ua) {
  ua = getBrowserUA(ua);
  return /\bOS(?:\s([\d_.]+))?\slike\sMac\sOS\sX\b/.test(ua) ?
    RegExp.$1.replace(/_/g, '.') : '';
}

/**
 * 检查指定 useragent 字符串是否符合华为或荣耀设备特征。
 * @param {string} ua useragent 字符串，浏览器环境下默认为 navigator.userAgent。
 * @return {boolean} 是否符合华为或荣耀设备特征。
 */
export function isHuawei(ua) {
  ua = getBrowserUA(ua);
  return /\b(?:huawei|honor)/i.test(ua);
}
