/**
 * 本模块提供本地存储相关方法的封装。
 * @module storage
 */

import { tryParseJSON } from './lang';

/**
 * 本地存储调用封装。
 * @author luoliquan
 * @param {Object} storageType 存储类型。
 */
export class StorageWrap {
  constructor(storageType) {
    this._storageType = storageType;
  }

  /**
   * 获取指定存储项的值。
   * @param {string} key 存储项键名。
   * @return {string} 存储项的值。
   */
  get(key) {
    return this._storageType.getItem(key);
  }

  /**
   * 获取指定存储项的值并解析为 JSON。
   * @param {string} key 存储项键名。
   * @return {Any} 解析结果。
   */
  getAsJSON(key) {
    return tryParseJSON(this.get(key));
  }

  /**
   * 写入指定存储项的值。
   * @param {string} key 存储项键名。
   * @param {Any} value 存储项的值。
   * @return {boolean} 写入是否成功。
   */
  set(key, value) {
    // 在浏览器的隐私模式下 setItem 会抛出异常
    // 但 getItem 和 removeItem 都不会
    try {
      this._storageType.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * 把指定值序列化为 JSON 字符串后写入到指定存储项。
   * @param {string} key 存储项键名。
   * @param {Any} value 存储项的值。
   * @return {boolean} 写入是否成功。
   */
  setAsJSON(key, value) {
    return this.set(key, JSON.stringify(value));
  }

  /**
   * 移除存储项。
   * @param {string} key 存储项键名。
   */
  remove(key) {
    this._storageType.removeItem(key);
  }
}


let sessionStorage, localStorage;
if (typeof window !== 'undefined') {
  sessionStorage = window.sessionStorage;
  localStorage = window.localStorage;
}

/**
 * sessionStorage 存取方法（通过 StorageWrap 包装了 sessionStorage）。
 * @example
 * const user = { name: 'Tom', pet: 'cat' };
 * session.setAsJSON('user', user);
 * typeof session.get('user'); // 'string'
 * typeof session.getAsJSON('user'); // 'object'
 */
export const session = new StorageWrap(sessionStorage);

/**
 * localStorage 存取方法（通过 StorageWrap 包装了 localStorage）。
 * @example
 * const user = { name: 'Tom', pet: 'cat' };
 * local.setAsJSON('user', user);
 * local.getAsJSON('user');
 * typeof local.get('user'); // 'string'
 * typeof local.getAsJSON('user'); // 'object'
 */
export const local = new StorageWrap(localStorage);
