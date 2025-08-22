/**
 * 本模块提供加密处理相关方法。
 * @packageDocumentation
 */

import * as md5 from 'md5';
import * as sha256 from 'sha256';


/**
 * 生成保利威 API 签名（https://help.polyv.net/index.html#/live/api/buildSign）。
 * @param obj 需要签名的对象。
 * @param appSecret 应用密钥。
 * @param method 签名方法。当 obj.signatureMethod 为 SHA256 时，默认为 sha256，否则默认为 md5。
 * @returns 签名字符串。
 */
export function genAPISign(
  obj: Record<string, unknown>,
  appSecret: string,
  method?: 'md5' | 'sha256'
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

  if (!method) {
    if (String(obj.signatureMethod).toLowerCase() === 'sha256') {
      method = 'sha256';
    } else {
      method = 'md5';
    }
  }

  const sign: (body: string) => string = method === 'sha256' ? sha256 : md5;

  return sign(appSecret + query + appSecret)
    .toString()
    .toUpperCase();
}
