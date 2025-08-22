import { hexToRGB } from '@/color';
const QUnit = window.QUnit;

QUnit.test('color', async (assert) => {
  assert.strictEqual(hexToRGB('#a'), null);
  assert.deepEqual(hexToRGB('#f00'), [255, 0, 0]);
  assert.deepEqual(hexToRGB('#ffff00'), [255, 255, 0]);
});
