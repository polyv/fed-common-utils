import {
  boolToYN,
  ynToBool,
  allY,
  someY,
  allN,
  someN
} from '@/boolean';
const QUnit = window.QUnit;

QUnit.test('boolToYN', (assert) => {
  assert.strictEqual(boolToYN(true), 'Y');
  assert.strictEqual(boolToYN(false), 'N');
});

QUnit.test('ynToBool', (assert) => {
  assert.strictEqual(ynToBool('Y'), true);
  assert.strictEqual(ynToBool(0, 'Y'), true);
  assert.strictEqual(ynToBool('N'), false);
});

QUnit.test('allY', (assert) => {
  assert.strictEqual(allY(['Y', 'Y', 'Y']), true);
  assert.strictEqual(allY(['N', 'Y', 'N']), false);
});

QUnit.test('someY', (assert) => {
  assert.strictEqual(someY(['Y', 'Y', 'Y']), true);
  assert.strictEqual(someY(['N', 'Y', 'N']), true);
  assert.strictEqual(someY(['N', 'N', 'N']), false);
});

QUnit.test('allN', (assert) => {
  assert.strictEqual(allN(['N', 'N', 'N']), true);
  assert.strictEqual(allN(['N', 'Y', 'N']), false);
});

QUnit.test('someN', (assert) => {
  assert.strictEqual(someN(['N', 'N', 'N']), true);
  assert.strictEqual(someN(['N', 'Y', 'N']), true);
  assert.strictEqual(someN(['Y', 'Y', 'Y']), false);
});
