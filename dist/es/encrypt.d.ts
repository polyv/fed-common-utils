/**
 * 本模块提供加密处理相关方法。
 * @packageDocumentation
 */
/**
 * 生成保利威 API 签名（https://help.polyv.net/index.html#/live/api/buildSign）。
 * @param obj 需要签名的对象。
 * @param appSecret 应用密钥。
 * @returns 签名字符串。
 */
export declare function genAPISign(obj: Record<string, unknown>, appSecret: string): string;
