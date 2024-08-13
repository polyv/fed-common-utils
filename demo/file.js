import {
  convertFileSize
} from '@/file';
const QUnit = window.QUnit;

QUnit.test('convertFileSize', (assert) => {
  assert.deepEqual(
    convertFileSize(1024, 'KB'),
    { value: 1, unit: 'KB' }
  );

  assert.deepEqual(
    convertFileSize(1024 * 1024, { unit: 'MB' }),
    { value: 1, unit: 'MB' }
  );

  assert.deepEqual(
    convertFileSize(1024 * 1024, { unit: 'GB', allowPureDecimal: false }),
    { value: 1, unit: 'MB' }
  );
});
