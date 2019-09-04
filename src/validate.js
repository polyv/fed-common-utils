/**
 * 本模块提供字符串格式验证方法。
 * @module validate
 */

/**
 * 检查目标字符串是否手机号码。
 * @author liumin
 * @param {string} str 目标字符串。
 * @return {boolean} 目标字符串是否手机号码。
 */
export function isPhoneNO(str) {
  return /^1[3-9]\d{9}$/.test(str);
}

/**
 * 检查目标字符串是否电子邮箱地址。
 * @author luoliquan
 * @param {string} str 目标字符串。
 * @return {boolean} 目标字符串是否电子邮箱地址。
 */
export function isEmail(str) {
  let temp = /^[\w-]+(?:\.[\w-]+)*@[\w-]+(?:\.[\w-]+)*\.[a-zA-Z]{2,}$/.test(str);
  if (temp) {
    temp = str.replace('@', '.').split('.');
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
