/**
 * 本模块提供异步控制相关方法。
 * @packageDocumentation
 */


/**
 * 创建一个在指定时间后完成的 Promise。
 * @param time 指定时间（毫秒）。
 * @returns 在指定时间后完成的 Promise。
 */
export function sleep(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}
