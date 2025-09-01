/**
 * 本模块提供加密处理相关方法。
 * @packageDocumentation
 */
/**
 * 生成保利威 API 签名（https://help.polyv.net/index.html#/live/api/buildSign）。
 * @param obj 需要签名的对象。
 * @param appSecret 应用密钥。
 * @param method 签名方法。当 obj.signatureMethod 为 SHA256 时，默认为 sha256，否则默认为 md5。
 * @returns 签名字符串。
 */
export declare function genAPISign(obj: Record<string, unknown>, appSecret: string, method?: 'md5' | 'sha256'): string;
