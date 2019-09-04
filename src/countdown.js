/**
 * 本模块提供倒数功能。
 * @module countdown
 */

const computes = [
  { divisor: 24 * 60 * 60 * 1000, unit: 'days' },
  { divisor: 60 * 60 * 1000, unit: 'hours' },
  { divisor: 60 * 1000, unit: 'minutes' },
  { divisor: 1000, unit: 'seconds' }
];

/**
 * 倒计时回调函数。
 * @callback countdownCallback
 * @memberof module:countdown.Countdown
 * @param {Object} rest 剩余的时间。
 *   @param {number} rest.days 剩余天数。
 *   @param {number} rest.hours 剩余小时数。
 *   @param {number} rest.minutes 剩余分钟数。
 *   @param {number} rest.seconds 剩余秒数。
 *   @param {boolean} rest.totalMsecs 剩余的总毫秒数。
 */
/**
 * 倒计时类。
 * @memberof module:countdown
 * @class
 * @name Countdown
 * @author luoliquan
 * @param {number} secs 总秒数。
 * @param {countdownCallback} [cb] 回调函数。
 */
export default class Countdown {
  constructor(secs, cb) {
    secs = parseInt(secs);
    if (isNaN(secs)) { throw new Error('Total seconds must be a number'); }
    this._secs = secs * 1000; // 倒计时毫秒数
    this._cb = typeof cb === 'function' ? cb : function() {}; // 倒计时回调函数
  }

  _exec() {
    if (!this._startTime) { return; }

    let value = Math.max(0, this._secs - (Date.now() - this._startTime));
    if (value > 0 && !this._stopped) {
      setTimeout(() => { this._exec(); }, 1000);
    }

    if (value >= 0) {
      const rest = {
        totalMsecs: value
      };
      computes.forEach((item, i) => {
        rest[item.unit] = value / item.divisor;
        if (i === computes.length - 1) {
          rest[item.unit] = Math.round(rest[item.unit]);
        } else {
          rest[item.unit] = Math.floor(rest[item.unit]);
          value = value % item.divisor;
        }
      });
      this._cb(rest);
    }
  }

  /**
   * 开始倒计时。
   * @method
   * @memberof module:countdown.Countdown.prototype
   */
  start() {
    if (this.secs <= 0) { return; }
    this._startTime = Date.now();
    this._exec();
  }

  /**
   * 停止倒计时。
   * @method
   * @memberof module:countdown.Countdown.prototype
   */
  stop() {
    if (this._timerId) { clearTimeout(this._timerId); }
    this._stopped = true;
  }
}
