import {
  isChsPhoneNO,
  isPhoneNO,
  isEmail
} from '@/validate';
const QUnit = window.QUnit;

QUnit.test('isChsPhoneNO', (assert) => {
  assert.strictEqual(isChsPhoneNO('13800138000'), true, '合法号码');
  assert.strictEqual(isChsPhoneNO('1380'), false, '非法号码');
  assert.strictEqual(isChsPhoneNO('12000000000'), false, '非法号码');
  assert.strictEqual(isChsPhoneNO('a13800138000c'), false, '非法号码');
});

QUnit.test('isPhoneNO', (assert) => {
  assert.strictEqual(isPhoneNO('13800138000'), true, '合法号码');
  assert.strictEqual(isPhoneNO('1380', '+123'), false, '非法号码');
  assert.strictEqual(isPhoneNO('12000000000', '+86'), false, '非法号码');
  assert.strictEqual(isPhoneNO('a13800138000c'), false, '非法号码');
});

QUnit.test('isEmail', (assert) => {
  assert.strictEqual(isEmail('me@polyv.net'), true, '合法地址');
  assert.strictEqual(isEmail('me@polyv_.net-'), false, '非法地址');
  assert.strictEqual(isEmail('@polyv.net'), false, '非法地址');
});
