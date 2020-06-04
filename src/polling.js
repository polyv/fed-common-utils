/**
 * 本模块提供轮询功能。
 * @module polling
 */

import { theGlobal } from './internal/core';

/**
 * 轮询类。
 * @memberof module:polling
 * @class
 * @name Polling
 * @constructor
 * @param {Function} executor 执行函数，返回值为 Promise（带有 then 方法）时会进行异步处理。
 * @param {Object} [options] 其他选项。
 *   @param {number} [options.interval=1000] 轮询间隔（毫秒）。
 *   @param {boolean} [options.breakOnError=false] 执行函数有异常（包括 Promise 的拒绝状态）时是否中断轮询。
 * @example
 * const polling = new Polling(() => {
 *   return new Promise((resolve) => {
 *     setTimeout(() => {
 *       console.log('executed');
 *       resolve();
 *     }, 1000);
 *   });
 * }, {
 *   interval: 2000
 * });
 * polling.start();
 */
export default class Polling {
  constructor(executor, options) {
    // 执行函数
    this._executor = executor;
    // 其他选项
    this._options = Object.assign({
      interval: 1000,
      breakOnError: false
    }, options);
    // 轮询计时器 id
    this._timerId = null;
    // 轮询是否已开始
    this._started = false;
    // 是否正在运行执行函数（针对异步情况）
    this._isExecuting = false;
    // 是否要在当前轮询之后马上运行执行函数
    this._shouldImmediate = false;
  }

  // 执行轮询函数
  _exec() {
    let result;
    try {
      result = this._executor.call(theGlobal);
    } catch (e) {
      if (this._options.breakOnError) {
        this.stop();
      }
    }

    if (result && typeof result.then === 'function') {
      // 异步情况，在 Promise 回调中继续下一次轮询
      this._isExecuting = true;
      result.then(() => {
        this._isExecuting = false;
        this._next();
      }, () => {
        this._isExecuting = false;
        if (this._options.breakOnError) {
          this.stop();
        } else {
          this._next();
        }
      });

    } else {
      // 同步情况，直接执行下一次轮询
      this._next();
    }
  }

  // 下一次轮询
  _next() {
    if (this._shouldImmediate) {
      // 外部调用了 execImmediately，马上执行
      this._exec();

    } else if (this._started) {
      // 进入下一次轮询
      this._timerId = setTimeout(() => {
        this._exec();
      }, this._options.interval);
    }
  }

  /**
   * 在当前轮询结束后马上执行一次执行函数。
   * @method
   * @memberof module:polling.Polling.prototype
   */
  execImmediately() {
    // 阻止下次轮询
    this._clearTimeout();

    if (this._isExecuting) {
      // 如果当前轮询还在运行中，先记录下来，待结束后再执行
      this._shouldImmediate = true;
    } else {
      // 下一次轮询还没开始，直接运行执行函数
      this._exec();
    }
  }

  /**
   * 启动轮询。
   * @method
   * @memberof module:polling.Polling.prototype
   */
  start() {
    this._started = true;
    this._exec();
  }

  /**
   * 停止轮询。
   * @method
   * @memberof module:polling.Polling.prototype
   */
  stop() {
    this._clearTimeout();
    this._started = false;
  }

  // 清理计时器
  _clearTimeout() {
    if (this._timerId) {
      clearTimeout(this._timerId);
      this._timerId = null;
    }
  }
}
