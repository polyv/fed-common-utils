import {
  isEmptyData,
  extend,
  cloneJSON
} from '@/lang';
const QUnit = window.QUnit;

QUnit.test('isEmptyData', (assert) => {
  assert.strictEqual(isEmptyData(null), true, 'null');
  assert.strictEqual(isEmptyData([]), true, '空数组');
  assert.strictEqual(isEmptyData({}), true, '空对象');
  assert.strictEqual(isEmptyData(''), true, '空字符串');
  assert.strictEqual(isEmptyData('  '), true, '空白字符');
  assert.strictEqual(isEmptyData(new Date()), false, '日期');
  assert.strictEqual(isEmptyData('aa'), false, '非空字符串');
  assert.strictEqual(isEmptyData({ a: 1 }), false, '非空对象');
});

QUnit.test('extend', (assert) => {
  assert.deepEqual(
    extend({ a: 1, b: 2 }, { c: 3 }, { d: 4 }),
    { a: 1, b: 2, c: 3, d: 4 }
  );
});

QUnit.test('clone', (assert) => {
  const src = {
    a: 1,
    b: 2
  };
  const copy = cloneJSON(src);
  assert.notStrictEqual(src, copy);
  assert.deepEqual(src, copy);
});
