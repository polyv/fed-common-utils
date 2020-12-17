import {
  startsWithProtocol,
  changeProtocol
} from '@/net';

const QUnit = window.QUnit;

QUnit.test('startsWithProtocol', (assert) => {
  assert.strictEqual(startsWithProtocol('http://abc.com'), true, 'http');
  assert.strictEqual(startsWithProtocol('https://abc.com'), true, 'https');
  assert.strictEqual(startsWithProtocol('file:///Users/'), true, '本地文件');
  assert.strictEqual(startsWithProtocol('//abc.com'), true, '跟随页面协议');
  assert.strictEqual(startsWithProtocol('abc.com'), false, '不包含协议');

  assert.strictEqual(
    startsWithProtocol('http://abc.com', ['http', 'https']),
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
    changeProtocol('http://cde.com', 'https'),
    'https://cde.com',
    '有协议'
  );
  assert.strictEqual(
    changeProtocol('//bcd.com', 'http'),
    'http://bcd.com',
    '跟随页面协议替换为具体协议'
  );
  assert.strictEqual(
    changeProtocol('abc.com', 'https'),
    'https://abc.com',
    '无协议'
  );
  assert.strictEqual(
    changeProtocol('https://abc.com', 'http://'),
    'http://abc.com',
    '带有协议符号'
  );
  assert.strictEqual(
    changeProtocol('https://abc.com', '//'),
    '//abc.com',
    '替换为跟随页面协议'
  );
});
