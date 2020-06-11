/**
 * 本模块提供函数处理相关方法。
 * @module function
 */

/**
 * 返回一个新函数，该函数在指定函数执行完成前，不会再次执行该指定函数。
 * @param {Function} fn 指定函数。此函数必须返回 Promise 实例（或为异步函数）。
 * @param {Object} options 其他参数。
 *   @param {Any} options.recObj 若 recObj 和 recProp 同时存在，状态变更时将更新 recObj[recProp]。
 *   @param {Any} options.recProp 若 recObj 和 recProp 同时存在，状态变更时将更新 recObj[recProp]。
 * @return {Function} 新函数。
 */
export function doIfDone(fn, options) {
  let doing = false;

  const updateDoing = (value) => {
    doing = value;
    if (options.recObj && options.recProp) {
      options.recObj[options.recProp] = value;
    }
  };

  return function() {
    if (doing) { return; }

    updateDoing(true);
    try {
      fn().then(function() {
        updateDoing(false);
      }, function() {
        updateDoing(false);
      });
    } catch (e) {
      updateDoing(false);
      throw e;
    }
  };
}
