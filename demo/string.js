import { strLen, cutStr } from '@/string.js';
import { escapeHTML, removeTags, nl2br } from '../src/string';
const QUnit = window.QUnit;

QUnit.test('strLen', (assert) => {
  assert.strictEqual(strLen('abcde;'), 6, '英文字符');
  assert.strictEqual(strLen('abc测试；'), 9, '中英混合');
  assert.strictEqual(strLen('abc测试；', 1), 6, '都按一个字符算');
});

QUnit.test('cutStr', (assert) => {
  assert.strictEqual(cutStr('测试一下', 5), '测试...', '超出长度限制');
  assert.strictEqual(cutStr('测试一下', 8), '测试一下', '未超出长度限制');
  assert.strictEqual(
    cutStr('测试一下', 5, { ellipsis: '---' }),
    '测试---',
    '省略符号'
  );
  assert.strictEqual(
    cutStr('测试一下', 3, { mode: 1, ellipsis: '---' }),
    '测试一---',
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
