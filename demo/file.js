import {
  convertFileSize,
  getExtname,
  FileType,
  getFileType
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

QUnit.test('getExtname', (assert) => {
  assert.strictEqual(getExtname('abc.png'), 'png');
  assert.strictEqual(getExtname('abc'), '');
  assert.strictEqual(getExtname('https://abc.com'), '');
  assert.strictEqual(getExtname('https://abc.com/a.jpg?abc#abc'), 'jpg');
});

QUnit.test('getFileType', (assert) => {
  assert.strictEqual(getFileType('https://abc.com/a.jpg?abc#abc'), FileType.Image);
  assert.strictEqual(getFileType('a.png'), FileType.Image);
  assert.strictEqual(getFileType('a.pdf'), FileType.PDF);
  assert.strictEqual(getFileType('a.doc'), FileType.Word);
  assert.strictEqual(getFileType('a.pptx'), FileType.PPT);
  assert.strictEqual(getFileType('a.zip'), FileType.Others);
});
