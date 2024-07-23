/**
 * 本模块提供倒计时功能。
 * @packageDocumentation
 */

/**
 * 表示剩余时长。
 */
export interface IRemaining {
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

/**
 * 秒数转换的计算项。
 */
interface ComputeItem {
  /**
   * 进制。
   */
  divisor: number;
  /**
   * 单位。
   */
  unit: keyof IRemaining
}

const computes: ComputeItem[] = [
  { divisor: 24 * 60 * 60, unit: 'days' },
  { divisor: 60 * 60, unit: 'hours' },
  { divisor: 60, unit: 'minutes' },
  { divisor: 1, unit: 'seconds' }
];

/**
 * 倒计时的回调函数。
 */
export interface ICountdownCallback {
  (remaining: IRemaining): void
}


/**
 * 倒计时类。
 * @example
 * ```javascript
 * const countdown = new Countdown(60, (remaining) => {
 *   console.dir(remaining);
 * });
 * countdown.start();
 * ```
 */
export class Countdown {
  /**
   * 倒计时总时间的毫秒表示。
   */
  protected readonly _totalMSecs: number;
  /**
   * 倒计时回调函数。
   */
  protected readonly _cb: ICountdownCallback;
  /**
   * 倒计时剩余时间的毫秒表示。
   */
  protected _remainingMSecs?: number;
  /**
   * 当前正在使用的倒计时秒数。
   */
  protected _usingMSecs?: number;
  /**
   * 倒计时开始时间的毫秒级时间戳，为 undefined 时表示倒计时未开始。
   */
  protected _startTime?: number;
  /**
   * 倒计时定时器 id。
   */
  protected _timerId?: number;

  /**
   * 倒计时类构造函数。
   * @param totalSecs 倒计时总秒数。
   * @param cb 剩余时长的回调函数，正常情况下大概 1 秒回调一次。
   */
  constructor(totalSecs: number, cb: ICountdownCallback) {
    totalSecs = totalSecs | 0;
    if (isNaN(totalSecs)) { throw new Error('Total seconds must be a number'); }
    this._totalMSecs = totalSecs * 1000;
    this._cb = cb;
  }

  /**
   * 倒计时的具体操作。
   */
  protected _exec(): void {
    if (!this._startTime || this._usingMSecs == null) { return; }

    // 计算剩余时间，如果剩余时间大于 0 而且没有停止倒计时，则继续倒计时
    let value = Math.max(0, this._usingMSecs - (Date.now() - this._startTime));
    if (value > 0) {
      setTimeout(() => { this._exec(); }, 1000);
    }

    this._remainingMSecs = value;

    if (value >= 0) {
      const remaining: IRemaining = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalMsecs: value
      };
      value = Math.round(value / 1000); // 毫秒转换成秒
      computes.forEach((item, i) => {
        remaining[item.unit] = value / item.divisor;
        if (i === computes.length - 1) {
          remaining[item.unit] = Math.round(remaining[item.unit]);
        } else {
          remaining[item.unit] = Math.floor(remaining[item.unit]);
          value = value % item.divisor;
        }
      });
      this._cb(remaining);
    }
  }

  /**
   * 开始倒计时。
   */
  public start(): void {
    if (this._usingMSecs == null) {
      this._usingMSecs = this._totalMSecs;
    }
    if (this._usingMSecs <= 0) { return; }
    this._startTime = Date.now();
    this._exec();
  }

  /**
   * 中断倒计时。
   */
  protected _break(): void {
    if (this._timerId) { clearTimeout(this._timerId); }
    this._startTime = undefined;
  }

  /**
   * 停止倒计时。如果再次调用 start，则重新开始倒计时。
   */
  public stop(): void {
    this._break();
    this._usingMSecs = this._totalMSecs;
  }

  /**
   * 暂停倒计时。如果再次调用 start，则继续未完成的倒计时。
   */
  public pause(): void {
    this._break();
    this._usingMSecs = this._remainingMSecs;
  }
}
