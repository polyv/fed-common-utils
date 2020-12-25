import {
  isMobile,
  isWeixin,
  weixinVersion,
  isWorkWeixin,
  ieVersion,
  isAndroid,
  isIOS,
  iOSVersion,
  isHuawei
} from '@/browser';
const QUnit = window.QUnit;

const UA_PC_WORK_WEIXIN = 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36 QBCore/4.0.1305.400 QQBrowser/9.0.2524.400 Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36 wxwork/3.0.36 (MicroMessenger/6.2) WindowsWechat';
const UA_IPHONE_WEIXIN = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.18(0x17001231) NetType/4G Language/zh_CN';
const UA_HUAWEI_ADR_QQ = 'Mozilla/5.0 (Linux; Android 10; SEA-AL10 Build/HUAWEISEA-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045426 Mobile Safari/537.36 V1_AND_SQ_8.4.18_1558_YYB_D N_8041810 QQ/8.4.18.4945 NetType/4G WebP/0.3.0 Pixel/2259 StatusBarHeight/81 SimpleUISwitch/0 QQTheme/1000 InMagicWin/0';
const UA_PC_IE = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)';

QUnit.test('isMobile', (assert) => {
  assert.strictEqual(isMobile(UA_PC_WORK_WEIXIN), false);
  assert.strictEqual(isMobile(UA_HUAWEI_ADR_QQ), true);
  assert.strictEqual(isMobile(UA_IPHONE_WEIXIN), true);
});

QUnit.test('isWeixin', (assert) => {
  assert.strictEqual(isWeixin(UA_PC_WORK_WEIXIN), true);
  assert.strictEqual(isWeixin(UA_IPHONE_WEIXIN), true);
  assert.strictEqual(isWeixin(UA_HUAWEI_ADR_QQ), false);
});

QUnit.test('isWorkWeixin', (assert) => {
  assert.strictEqual(isWorkWeixin(UA_PC_WORK_WEIXIN), true);
  assert.strictEqual(isWorkWeixin(UA_IPHONE_WEIXIN), false);
  assert.strictEqual(isWorkWeixin(UA_HUAWEI_ADR_QQ), false);
});

QUnit.test('weixinVersion', (assert) => {
  assert.strictEqual(weixinVersion(UA_PC_WORK_WEIXIN), '6.2');
  assert.strictEqual(weixinVersion(UA_IPHONE_WEIXIN), '7.0.18');
  assert.strictEqual(weixinVersion(UA_HUAWEI_ADR_QQ), '');
});

QUnit.test('ieVersion', (assert) => {
  assert.strictEqual(ieVersion(UA_PC_IE), '10');
  assert.strictEqual(ieVersion(UA_PC_WORK_WEIXIN), '');
});

QUnit.test('isAndroid', (assert) => {
  assert.strictEqual(isAndroid(UA_PC_WORK_WEIXIN), false);
  assert.strictEqual(isAndroid(UA_HUAWEI_ADR_QQ), true);
  assert.strictEqual(isAndroid(UA_IPHONE_WEIXIN), false);
});

QUnit.test('isIOS', (assert) => {
  assert.strictEqual(isIOS(UA_PC_WORK_WEIXIN), false);
  assert.strictEqual(isIOS(UA_HUAWEI_ADR_QQ), false);
  assert.strictEqual(isIOS(UA_IPHONE_WEIXIN), true);
});

QUnit.test('iOSVersion', (assert) => {
  assert.strictEqual(iOSVersion(UA_PC_WORK_WEIXIN), '');
  assert.strictEqual(iOSVersion(UA_HUAWEI_ADR_QQ), '');
  assert.strictEqual(iOSVersion(UA_IPHONE_WEIXIN), '14.1');
});

QUnit.test('isHuawei', (assert) => {
  assert.strictEqual(isHuawei(UA_PC_WORK_WEIXIN), false);
  assert.strictEqual(isHuawei(UA_HUAWEI_ADR_QQ), true);
  assert.strictEqual(isHuawei(UA_IPHONE_WEIXIN), false);
});
