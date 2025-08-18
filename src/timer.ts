/**
 * 本模块提供定时器相关方法。
 * @packageDocumentation
 */

/**
 * 通过 setTimeout 和递归来模拟 setInterval
 * @param fn 回调函数
 * @param intervalTime 间隔时间
 * @param options 选项
 * @returns 清除函数
 */
export function mockInterval(
  fn: (...arg: unknown[]) => unknown,
  intervalTime: number | (() => number),
  options?: {
    maxCount?: number;
    immediate?: boolean;
  },
): { clear: () => void } {
  const { maxCount = Infinity, immediate = false } = options || {};

  let timer: number | undefined;
  let intervalCount = 0;

  const getIntervalTime = () => {
    return typeof intervalTime === 'function' ? intervalTime() : intervalTime;
  };

  const innerInterval = () => {
    timer = window.setTimeout(() => {
      fn();
      intervalCount++;

      if (intervalCount < maxCount) {
        innerInterval();
      } else {
        window.clearTimeout(timer);
      }
    }, getIntervalTime());
  };

  if (immediate) {
    fn();
  }
  innerInterval();

  return {
    clear: () => {
      // 处理 intervalTime 过少的情况，比如 100ms
      window.setTimeout(() => {
        window.clearTimeout(timer);
      }, 0);
    },
  };
}

/**
 * 等待一段时间
 * @param time 等待时间
 */
export function waitTime(time = 3000): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
