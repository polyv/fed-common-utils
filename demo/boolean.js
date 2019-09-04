import {
  boolToYN,
  ynToBool
} from '@/boolean';
const QUnit = window.QUnit;

QUnit.test('boolToYN', (assert) => {
  assert.strictEqual(boolToYN(true), 'Y');
  assert.strictEqual(boolToYN(false), 'N');
});

QUnit.test('ynToBool', (assert) => {
  assert.strictEqual(ynToBool('Y'), true);
  assert.strictEqual(ynToBool('N'), false);
});
