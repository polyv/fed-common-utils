/**
 * 本模块提供日期处理相关方法。
 * @module date
 */

// 保证日期相关函数的操作对象为日期类型
export function ensureDate(date) {
  if (typeof date !== 'object') { date = new Date(date); }
  return date;
}

/**
 * 格式化日期。
 * @author luoliquan
 * @param {(Date|number)} date 日期对象或时间戳（毫秒）。
 * @param {string} formation 格式。
 * @return {string} 格式化结果。
 */
export function formatDate(date, formation) {
  date = ensureDate(date);

  const values = {
    Y: date.getFullYear(),
    M: date.getMonth() + 1,
    D: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  };

  return formation.replace(/([YMDhms])\1*/g, (match) => {
    let result = values[match[0]];
    if (match.length > 1 && result.toString().length !== match.length) {
      result = ((new Array(match.length)).join('0') + result).slice(-match.length);
    }
    return result;
  });
}

/**
 * 把秒数格式化成「时:分:秒」格式。
 * @author luoliquan
 * @param {number} secs 秒数。
 * @param {Object} [options] 格式化配置。
 *   @param {number} [options.segments=2] 段数，2 或者 3。
 *     为 2 时，如果小时为 0，则格式化样式为「分:秒」。
 *   @param {number} [options.digits=2] 每一段数字的最小位数，不足位数时补 0。
 * @return {string} 格式化结果。
 */
export function formatSeconds(secs, options) {
  secs = Number(secs);
  if (isNaN(secs) || secs < 0) {
    throw new Error('"secs" must be a positive integer');
  }

  // 参数合法性校验
  options = Object.assign({}, options);
  options.segments = parseInt(options.segments);
  // 位数最小为 1
  options.digits = Math.max(1, parseInt(options.digits) || 2);
  // 段数只能为 2 或者 3
  if ([2, 3].indexOf(options.segments) === -1) {
    options.segments = 2;
  }

  // 需要补多少个 0
  const zeros = (new Array(options.digits + 1).join('0'));

  const result = [
    60 * 60,
    60,
    1
  ].map((num) => {
    const subResult = Math.floor(secs / num);
    const len = subResult.toString().length;
    secs = secs % num;
    return (zeros + subResult).slice(-Math.max(len, options.digits));
  });

  if (options.segments < 3 && !Number(result[0])) { result.shift(); }

  return result.join(':');
}
