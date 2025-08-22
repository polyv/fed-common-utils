/**
 * 本模块提供加密处理相关方法。
 * @packageDocumentation
 */

import * as md5 from 'md5';


/**
 * 生成保利威 API 签名（https://help.polyv.net/index.html#/live/api/buildSign）。
 * @param obj 需要签名的对象。
 * @param appSecret 应用密钥。
 * @returns 签名字符串。
 */
export function genAPISign(
  obj: Record<string, unknown>, appSecret: string
): string {
  const arr = Object.keys(obj)
    .filter((item) => item !== 'sign')
    .sort();

  let query = '';
  arr.forEach((key) => {
    let value = obj[key];
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    query += key + value;
  });
  return md5(appSecret + query + appSecret)
    .toString()
    .toUpperCase();
}
