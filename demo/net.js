import {
  startsWithProtocol,
  changeProtocol,
  removeProtocol,
  normalizeProtocol
} from '@/net';

const QUnit = window.QUnit;

const HTTPS_URL = 'https://abc.com';
const HTTP_URL = 'http://abc.com';

QUnit.test('startsWithProtocol', (assert) => {
  assert.strictEqual(startsWithProtocol(HTTP_URL), true, 'http');
  assert.strictEqual(startsWithProtocol(HTTPS_URL), true, 'https');
  assert.strictEqual(startsWithProtocol('file:///Users/'), true, '本地文件');
  assert.strictEqual(startsWithProtocol('//abc.com'), true, '跟随页面协议');
  assert.strictEqual(startsWithProtocol('abc.com'), false, '不包含协议');

  assert.strictEqual(
    startsWithProtocol(HTTP_URL, ['http', 'https']),
    true,
    '特定协议'
  );
  assert.strictEqual(
    startsWithProtocol('ftp://abc.com', ['http', 'https']),
    false,
    '特定协议'
  );
});

QUnit.test('changeProtocol', (assert) => {
  assert.strictEqual(
    changeProtocol(HTTP_URL, 'https'),
    HTTPS_URL,
    '有协议'
  );
  assert.strictEqual(
    changeProtocol('//abc.com', 'http'),
    HTTP_URL,
    '跟随页面协议替换为具体协议'
  );
  assert.strictEqual(
    changeProtocol('abc.com', 'https'),
    HTTPS_URL,
    '无协议'
  );
  assert.strictEqual(
    changeProtocol(HTTPS_URL, 'http://'),
    HTTP_URL,
    '带有协议符号'
  );
  assert.strictEqual(
    changeProtocol(HTTPS_URL, '//'),
    '//abc.com',
    '替换为跟随页面协议'
  );
  assert.strictEqual(
    normalizeProtocol(HTTPS_URL),
    window.location.protocol === 'http:' ? HTTP_URL : HTTPS_URL,
    '标准化页面协议'
  );
});

QUnit.test('removeProtocol', (assert) => {
  assert.strictEqual(
    removeProtocol('https://abc.com/abc.html'),
    'abc.com/abc.html'
  );

  assert.strictEqual(
    removeProtocol('abc.com/abc.html'),
    'abc.com/abc.html'
  );
});
