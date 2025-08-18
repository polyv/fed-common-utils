/**
 * 本模块提供数组处理相关方法。
 * @packageDocumentation
 */

/**
 * 创建元组
 * @example
 * ```typescript
 * const tuple = genTuple(1, 2, '3');
 * console.log(tuple); // [1, 2, '3']，类型：[1, 2, '3']
 * ```
 */
export const genTuple = <T extends (string | number | boolean)[]>(...args: T): T => args;

/**
 * 将数组分组
 * @param arr 数组
 * @param groupLen 每组数量
 * @returns 分组后的数组
 * @example
 * ```typescript
 * const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * const groups = groupArray(arr, 3);
 * console.log(groups); // [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
 * ```
 */
export function groupArray<T>(arr: T[] = [], groupLen = 3) {
  const groups: T[][] = [];
  arr.forEach((item, index) => {
    let group;
    if (groups.length > 0) {
      group = groups[groups.length - 1];
    } else {
      groups.push([]);
      group = groups[0];
    }
    if ((index + 1) % groupLen === 0) {
      group.push(item);
      if (index + 1 < arr.length) {
        groups.push([]);
      }
    } else {
      group.push(item);
    }
  });
  return groups;
}
