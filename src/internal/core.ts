/**
 * 全局对象，浏览器环境下为 window，Node 环境下为 global。
 */
export const theGlobal: Window | typeof globalThis | null = (
  function() {
    let result;
    if (typeof window !== 'undefined') {
      result = window;
    } else if (typeof global !== 'undefined') {
      result = global;
    } else {
      result = null;
    }
    return result;
  }
)();
