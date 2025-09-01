import {
  strLen,
  cutStr,
  escapeHTML,
  unescapeHTML,
  removeTags,
  nl2br,
  randomStr,
  uuidV4,
  compareVersions,
  maskChars
} from '@/string';
const QUnit = window.QUnit;

QUnit.test('strLen', (assert) => {
  assert.strictEqual(strLen('abcde;'), 6, '英文字符');
  assert.strictEqual(strLen('abc测试；'), 9, '中英混合');
  assert.strictEqual(strLen('abc测试；', 1), 6, '都按一个字符算');
  assert.strictEqual(strLen('abc测试；', {
    enLen: 0.5,
    nonEnLen: 1
  }), 4.5, '分别指定中英文单位长度');
});

QUnit.test('cutStr', (assert) => {
  assert.strictEqual(cutStr('测试一下', 5), '测...', '超出长度限制');
  assert.strictEqual(cutStr('测试一下', 8), '测试一下', '未超出长度限制');
  assert.strictEqual(
    cutStr('测试一下', 5, { ellipsis: '---' }),
    '测---',
    '省略符号'
  );
  assert.strictEqual(
    cutStr('测试一下下', 4, { enLen: 1, nonEnLen: 1, ellipsis: '---' }),
    '测---',
    '都按一个字符算'
  );
  assert.strictEqual(
    cutStr(
      '1测试2测试3', 3.5, {
        enLen: 0.5,
        nonEnLen: 1
      }
    ),
    '1测...',
    '分别指定中英文长度'
  );
});

const beforeEscape = '<abc a="1" b=\'&2\'>';
const afterEscape = '&lt;abc&nbsp;a=&quot;1&quot;&nbsp;b=&#39;&amp;2&#39;&gt;';

QUnit.test('escapeHTML', (assert) => {
  assert.strictEqual(escapeHTML(null), null, 'null');
  assert.strictEqual(escapeHTML(beforeEscape), afterEscape);
});

QUnit.test('unescapeHTML', (assert) => {
  assert.strictEqual(unescapeHTML(null), null, 'null');
  assert.strictEqual(unescapeHTML(afterEscape), beforeEscape);
});

QUnit.test('nl2br', (assert) => {
  assert.strictEqual(nl2br('1\r\n2\n'), '1<br />2<br />');
});

QUnit.test('removeTags', (assert) => {
  assert.strictEqual(removeTags('a<br />\r\n<span style="color: red;">b</span>'), 'a\r\nb');
});

QUnit.test('randomStr', (assert) => {
  const str1 = randomStr(10);
  const str2 = randomStr(10);
  assert.strictEqual(str1.length, 10);
  assert.strictEqual(str2.length, 10);
  assert.notEqual(str1, str2);
  assert.strictEqual(randomStr(10, 'abc-').length, 14);
});

QUnit.test('uuidV4', (assert) => {
  assert.strictEqual(
    uuidV4().length,
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.length
  );
});

QUnit.test('compareVersions', (assert) => {
  assert.strictEqual(
    compareVersions('1.2.1', '10.2.1') < 0,
    true
  );
  assert.strictEqual(
    compareVersions('1.2.1', '1.2.10') < 0,
    true
  );
  assert.strictEqual(
    compareVersions('1.2.0', '1.2.0.0') === 0,
    true
  );
});

QUnit.test('maskChars', (assert) => {
  const str = '1234567890';
  const allMasked = '**********';
  assert.strictEqual(maskChars(str, { start: 3, end: 6 }), '123****890');
  assert.strictEqual(maskChars(str, { start: 3 }), '123*******');
  assert.strictEqual(maskChars(str, { end: 6 }), '*******890');
  assert.strictEqual(maskChars(str, { start: 10 }), str);
  assert.strictEqual(maskChars(str, { end: 10 }), allMasked);
  assert.strictEqual(maskChars(str), allMasked);
  assert.strictEqual(maskChars(str, { maskChar: '#' }), allMasked.replace(/\*/g, '#'));
});
