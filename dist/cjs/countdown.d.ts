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
 * 倒计时的回调函数。
 */
export interface ICountdownCallback {
    (remaining: IRemaining): void;
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
export declare class Countdown {
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
     * @param secs 倒计时总秒数。
     * @param cb 剩余时长的回调函数，正常情况下大概 1 秒回调一次。
     */
    constructor(totalSecs: number, cb: ICountdownCallback);
    /**
     * 倒计时的具体操作。
     */
    protected _exec(): void;
    /**
     * 开始倒计时。
     */
    start(): void;
    /**
     * 中断倒计时。
     */
    protected _break(): void;
    /**
     * 停止倒计时。如果再次调用 start，则重新开始倒计时。
     */
    stop(): void;
    /**
     * 暂停倒计时。如果再次调用 start，则继续未完成的倒计时。
     */
    pause(): void;
}
