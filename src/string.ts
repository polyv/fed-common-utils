/**
 * 本模块提供字符串处理相关方法。
 * @packageDocumentation
 */

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
   * 省略符，默认为三个点号。
   */
  ellipsis?: string;
}

/**
 * 计算字符串长度。默认情况下，英文字符的单位长度为 1，非英文字符的单位长度为 2。
 * @param str 字符串。
 * @param options 为数字时表示非英文字符单位长度（此时英文字符单位长度为 1）；为 Object 时表示选项。
 * @return 字符串长度。
 * @example
 * ```javascript
 * strLen('abcde;'); // 6
 * strLen('abc测试；'); // 9
 * strLen('abc测试；', 1); // 6
 * strLen('abc测试；', { enLen: 0.5, nonEnLen: 1 }); // 4.5
 * ```
 */
export function strLen(
  str: string, options?: number | IStrLenOptions
): number {
  if (typeof options === 'number') {
    options = {
      enLen: 1,
      nonEnLen: options
    };
  } else {
    options = options || {};
    options.enLen = options.enLen ?? 1;
    options.nonEnLen = options.nonEnLen ?? 2;
  }

  let result = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    result += str.charCodeAt(i) > 255 ?
      (options.nonEnLen || 0) :
      (options.enLen || 0);
  }
  return result;
}

/**
 * 如果目标字符串超出限制长度，则进行截断并拼接省略符号；否则返回目标字符串。
 * 默认情况下，英文字符的单位长度为 1，非英文字符的单位长度为 2。
 * @param str 目标字符串。
 * @param length 限制的长度。
 * @param options 选项。
 * @return 截断后的字符串。
 * @example
 * ```javascript
 * cutStr('测试一下', 5); // '测试...'
 * cutStr('测试一下', 8); // '测试一下'
 * curStr('1测试2测试3', 3.5, { enLen: 0.5, nonEnLen: 1 }); // 1测...
 * ```
 */
export function cutStr(
  str: string, length: number, options?: ICutStrOptions
): string {
  options = options || {};
  options.enLen = Number(options.enLen) || 1;
  options.nonEnLen = Number(options.nonEnLen) || 2;
  options.ellipsis = options.ellipsis || '...';

  str = String(str);
  const len = strLen(str, options);

  // 未超出长度，直接返回传入的字符串
  if (len <= length) { return str; }

  // 减去省略符长度
  length -= strLen(options.ellipsis, options);

  let result = '', i = -1;
  while (length > 0 && ++i < len) {
    length -= str.charCodeAt(i) > 255 ? options.nonEnLen : options.enLen;
    if (length >= 0) { result += str.charAt(i); }
  }

  result += options.ellipsis;

  return result;
}


// 生成 HTML 预留字符与 HTML 实体的映射
const htmlChars = ['"', '\'', '&', '<', '>'];
const htmlEntities = ['&quot;', '&#39;', '&amp;', '&lt;', '&gt;'];
const charsToEntities: Record<string, string> = Object.create(null);
const entitiesToChars: Record<string, string> = Object.create(null);
htmlChars.forEach((item, i) => {
  charsToEntities[item] = htmlEntities[i];
  entitiesToChars[htmlEntities[i]] = item;
});
const reHTMLChars = new RegExp('[' + htmlChars.join('') + ']', 'g');
const reHTMLEntities = new RegExp('(' + htmlEntities.join('|') + ')', 'g');

/**
 * 把指定字符串中的 HTML 预留字符替换成 HTML 实体。
 * @param str 指定字符串。
 * @return 替换后的字符串。
 */
export function escapeHTML(str: string): string {
  if (str == null) { return str; }
  return String(str).replace(reHTMLChars, (match) => {
    return charsToEntities[match];
  });
}

/**
 * 把指定字符串中的 HTML 实体替换成 HTML 预留字符。
 * @param str 指定字符串。
 * @return 替换后的字符串。
 */
export function unescapeHTML(str: string): string {
  if (str == null) { return str; }
  return String(str).replace(reHTMLEntities, (match) => {
    return entitiesToChars[match];
  });
}


/**
 * 移除指定字符串中的 HTML 标签。
 * @param str 指定字符串。
 * @return 处理后的字符串。
 */
export function removeTags(str: string): string {
  if (str == null) { return ''; }
  return String(str).replace(/<.+?>/g, '');
}

/**
 * 把指定字符串中的换行符替换成 &lt;br /&gt;。
 * @param str 指定字符串。
 * @return 替换后的字符串。
 */
export function nl2br(str: string): string {
  if (str == null) { return str; }
  return String(str).replace(/\r?\n/g, '<br />');
}


/**
 * 生成随机字符串。
 * @param length 字符串长度。
 * @param prefix 字符串前缀（不计入长度）。
 * @returns 生成的随机字符串。
 */
export function randomStr(length: number, prefix?: string) {
  length = length | 0;
  if (!length || length < 0) {
    throw new Error('"length" must be a number greater than 0');
  }

  let result = '';
  do {
    result += Math.random().toString(36).substr(2);
  } while (result.length < length);

  // 拼接的长度可能大于指定长度，进行裁剪
  result = result.substr(0, length);

  if (prefix != null) { result = prefix + result; }

  return result;
}


/**
 * 生成 uuid(v4)。
 * @returns uuid。
 */
export function uuidV4(): string {
  let ts = Date.now();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    ts += performance.now();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(match) {
    const r = (ts + Math.random() * 16) % 16 | 0;
    ts = Math.floor(ts / 16);
    return (match === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}


/**
 * 版本号对比。
 * @param versionA 待比较版本 A。
 * @param versionB 待比较版本 B。
 * @return 大于 0 时，表示版本 A 大于版本 B；
 *   小于 0 时，表示版本 B 大于版本 A；
 *   等于 0 时，表示两个版本号一致。
 */
export function compareVersions(verA: string, verB: string): number {
  if (!verA || !verB) {
    throw new Error('Please specify both verA and verB');
  }

  const reg = /(\.0+)+$/; // 去掉末尾的 .000
  const verAParts = String(verA).replace(reg, '').split('.');
  const verBParts = String(verB).replace(reg, '').split('.');

  const len = Math.min(verAParts.length, verBParts.length);
  for (let i = 0; i < len; i++) {
    const diff = parseInt(verAParts[i]) - parseInt(verBParts[i]);
    if (diff) { return diff; }
  }
  return verAParts.length - verBParts.length;
}
