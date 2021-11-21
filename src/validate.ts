/**
 * 本模块提供数据验证方法。
 * @packageDocumentation
 */


/**
 * 检查目标字符串是否中国大陆手机号。
 * @param str 目标字符串。
 * @return 目标字符串是否中国大陆手机号。
 * @example
 * ```javascript
 * isPhoneNO('13800138000'); // true
 * isPhoneNO('a13800138000c'); // false
 * ```
 */
export function isChsPhoneNO(str: string): boolean {
  return /^1[3-9]\d{9}$/.test(str);
}

/**
 * 检查目标字符串是否电子邮箱地址。
 * @param str 目标字符串。
 * @return 目标字符串是否电子邮箱地址。
 * @example
 * ```javascript
 * isEmail('me@polyv.net'); // true
 * isEmail('me@polyv_.net-'); // false
 * ```
 */
export function isEmail(str: string): boolean {
  const canMatch = /^[\w-]+(?:\.[\w-]+)*@[\w-]+(?:\.[\w-]+)*\.[a-zA-Z]{2,}$/.test(str);
  if (canMatch) {
    const temp = str.replace('@', '.').split('.');
    for (let i = temp.length - 1; i >= 0; i--) {
      // 每一段的开头和结尾都不能是连字符或下划线
      if (/^[-_]/.test(temp[i]) || /[_-]$/.test(temp[i])) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}
