import { assignProps } from '@just4/util/object';

/**
 * 计算字符串长度的选项。
 */
export interface IStrLenOptions {
  /**
   * 英文字符单位长度。
   */
  enLen?: number;
  /**
   * 非英文字符单位长度。
   */
  nonEnLen?: number;
}

/**
 * 裁剪字符串的选项。
 */
export interface ICutStrOptions extends IStrLenOptions {
  /**
   * 省略符。
   */
  ellipsis: string;
}


/**
 * 计算字符串长度。默认情况下，英文字符的单位长度为 1，非英文字符的单位长度为 2。
 * @param str 字符串。
 * @param options 为数字时表示非英文字符单位长度（此时英文字符单位长度为 1）；为 Object 时表示选项。
 * @return 字符串长度。
 * @example
 * strLen('abcde;'); // 6
 * strLen('abc测试；'); // 9
 * strLen('abc测试；', 1); // 6
 * strLen('abc测试；', { enLen: 0.5, nonEnLen: 1 }); // 4.5
 */
export function strLen(str: string, options: number | IStrLenOptions): number {
  if (typeof options === 'number') {
    options = {
      enLen: 1,
      nonEnLen: options
    };
  } else {
    options = assignProps({
      enLen: 1,
      nonEnLen: 2
    }, options);
  }

  let result = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    result += str.charCodeAt(i) > 255 ?
      (options.nonEnLen || 0) :
      (options.enLen || 0);
  }
  return result;
}

// /**
//  * 如果目标字符串超出限制长度，则进行截断并拼接省略符号；否则返回目标字符串。
//  * @param {string} str 目标字符串。
//  * @param {number} length 限制的长度。
//  * @param {Object} [options] 选项。
//  *   @param {number} [options.mode=2] 非英文字符的单位长度。已废弃，请使用 nonEnLen。
//  *   @param {number} [options.enLen=1] 英文字符的单位长度。
//  *   @param {number} [options.nonEnLen=2] 非英文字符的单位长度。
//  *   @param {string} [options.ellipsis='...'] 省略符号。
//  * @return {string} 截断后的字符串。
//  * @example
//  * cutStr('测试一下', 5); // '测试...'
//  * cutStr('测试一下', 8); // '测试一下'
//  * curStr('1测试2测试3', 3.5, { enLen: 0.5, nonEnLen: 1 }); // 1测...
//  */
// export function cutStr(
//   str: string, length: number, options: ICutStrOptions = {
//     ellipsis: '...'
//   }
// ): string {
//   str = String(str);
//   const len = strLen(str, options);

//   // 未超出长度，直接返回传入的字符串
//   if (len <= length) { return str; }

//   // 减去省略符长度
//   length -= strLen(options.ellipsis, options);

//   let enLen = Number(options.enLen);
//   let nonEnLen = Number(options.nonEnLen);

//   let result = '', i = -1;
//   while (length > 0 && ++i < len) {
//     length -= str.charCodeAt(i) > 255 ?
//       options.nonEnLen :
//       options.enLen;
//     if (length >= 0) { result += str.charAt(i); }
//   }

//   result += options.ellipsis;

//   return result;
// }
 
//  /**
//   * 把指定字符串中的 HTML 预留字符替换成 HTML 实体。
//   * @param {string} str 指定字符串。
//   * @return {string} 替换后的字符串。
//   */
//  export function escapeHTML(str) {
//    if (str == null) { return str; }
//    const map = {
//      '"': '&quot;',
//      '\'': '&#39;',
//      '&': '&amp;',
//      '<': '&lt;',
//      '>': '&gt;'
//    };
//    return String(str).replace(/["'&<>]/g, (match) => {
//      return map[match];
//    });
//  }
 
//  /**
//   * 移除指定字符串中的 HTML 标签。
//   * @param {string} str 指定字符串。
//   * @return {string} 处理后的字符串。
//   */
//  export function removeTags(str) {
//    if (str == null) { return str; }
//    return String(str).replace(/<.+?>/g, '');
//  }
 
//  /**
//   * 把指定字符串中的换行符替换成 &lt;br /&gt;。
//   * @param {string} str 指定字符串。
//   * @return {string} 替换后的字符串。
//   */
//  export function nl2br(str) {
//    if (str == null) { return str; }
//    return String(str).replace(/\r?\n/g, '<br />');
//  }
 
//  /**
//   * 生成随机字符串。
//   * @since 1.6.0
//   * @param {number} length 字符串长度。
//   * @param {string} [prefix] 字符串前缀（不计入长度）。
//   * @returns {string} 生成的随机字符串。
//   */
//  export function randomStr(length, prefix) {
//    length = parseInt(length);
//    if (!length || length < 0) {
//      throw new Error('"length" must be a number greater than 0');
//    }
 
//    let result = '';
//    do {
//      result += Math.random().toString(36).substr(2);
//    } while (result.length < length);
 
//    // 拼接的长度可能大于指定长度，进行裁剪
//    result = result.substr(0, length);
 
//    if (prefix != null) { result = prefix + result; }
 
//    return result;
//  }
 
//  /**
//   * 版本号对比。
//   * @since 1.6.0
//   * @param {string} versionA 待比较版本 A。
//   * @param {string} versionB 待比较版本 B。
//   * @return {number} 大于 0 时，表示版本 A 大于版本 B；
//   *   小于 0 时，表示版本 B 大于版本 A；
//   *   等于 0 时，表示两个版本号一致。
//   */
//  export function compareVersions(versionA, versionB) {
//    if (!versionA || !versionB) {
//      throw new Error('Please specify both version-a and verson-b');
//    }
 
//    // 去掉末尾的 .000
//    const reg = /(\.0+)+$/;
//    versionA = String(versionA).replace(reg, '').split('.');
//    versionB = String(versionB).replace(reg, '').split('.');
 
//    const len = Math.min(versionA.length, versionB.length);
//    for (let i = 0; i < len; i++) {
//      const diff = parseInt(versionA[i]) - parseInt(versionB[i]);
//      if (diff) { return diff; }
//    }
//    return versionA.length - versionB.length;
//  }
