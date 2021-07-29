/**
 * 本模块提供倒数功能。
 * @module countdown
 */


interface ComputeItem {
  divisor: number;
  unit: string
}

const computes: ComputeItem[] = [
  { divisor: 24 * 60 * 60, unit: 'days' },
  { divisor: 60 * 60, unit: 'hours' },
  { divisor: 60, unit: 'minutes' },
  { divisor: 1, unit: 'seconds' }
];

/**
 * 倒计时回调函数的参数，表示剩余时间。
 */
export interface Remaining {
  /**
   * 剩余天数。
   */
  days: number;
  /**
   * 剩余小时数。
   */
  hours: number;
  /**
   * 剩余分钟数。
   */
  minutes: number;
  /**
   * 剩余秒数。
   */
  seconds: number;
  /**
   * 剩余总时间的毫秒表示。
   */
  totalMsecs: number;
}

export interface CountdownCallback {
  (remaining: Remaining): void
}

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
 * @example
 * const countdown = new Countdown(60, (rest) => {
 *   console.dir(rest);
 * });
 * countdown.start();
 */
export default class Countdown {
  /**
   * 倒计时总时间的毫秒表示。
   */
  protected _secs: number;
  /**
   * 倒计时回调函数。
   */
  protected _cb: CountdownCallback;
  /**
   * 倒计时开始时间的毫秒级时间戳。
   */
  protected _startTime: number;
  /**
   * 倒计时是否已停止。
   */
  protected _stopped: boolean;

  constructor(secs: number, cb: CountdownCallback) {
    secs = secs | 0;
    if (isNaN(secs)) { throw new Error('Total seconds must be a number'); }
    this._secs = secs * 1000;
    this._cb = cb;
  }

  protected _exec(): void {
    if (!this._startTime) { return; }

    let value = Math.max(0, this._secs - (Date.now() - this._startTime));
    if (value > 0 && !this._stopped) {
      setTimeout(() => { this._exec(); }, 1000);
    }

    if (value >= 0) {
      const remaining = {
        totalMsecs: value
      };
      value = Math.round(value / 1000);
      computes.forEach((item, i) => {
        remaining[item.unit] = value / item.divisor;
        if (i === computes.length - 1) {
          remaining[item.unit] = Math.round(remaining[item.unit]);
        } else {
          remaining[item.unit] = Math.floor(remaining[item.unit]);
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
