import {
  strLen,
  cutStr,
  escapeHTML,
  removeTags,
  nl2br,
  randomStr
} from '@/string.js';
const QUnit = window.QUnit;

QUnit.test('strLen', (assert) => {
  assert.strictEqual(strLen('abcde;'), 6, '英文字符');
  assert.strictEqual(strLen('abc测试；'), 9, '中英混合');
  assert.strictEqual(strLen('abc测试；', 1), 6, '都按一个字符算');
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
    cutStr('测试一下下', 4, { mode: 1, ellipsis: '---' }),
    '测---',
    '都按一个字符算'
  );
});

QUnit.test('escapeHTML', (assert) => {
  assert.strictEqual(escapeHTML(null), null, 'null');
  assert.strictEqual(escapeHTML('<abc a="1" b=\'&2\'>'), '&lt;abc a=&quot;1&quot; b=&#39;&amp;2&#39;&gt;');
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
