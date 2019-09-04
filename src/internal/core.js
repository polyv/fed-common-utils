/**
 * @module
 * @ignore
 */

// ESLint 不推荐直接使用 obj.hasOwnProperty
const hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * 检查指定对象是否具有某个 own property。
 * @function
 * @name hasOwnProp
 * @luoliquan
 * @param {Any} obj 指定对象。
 * @param {string} prop 属性名。
 * @return {boolean} 指定对象是否具有某个 own property。
 */
export function hasOwnProp(obj, prop) {
  return hasOwnProperty.call(obj, prop);
}

// 单个源扩展
export function extendSingle(target, src) {
  if (src != null) {
    let key, value;
    for (key in src) {
      value = src[key];
      if (key === '__proto__' || target === value) { continue; }
      if (hasOwnProperty.call(src, key)) { target[key] = value; }
    }
  }
}
