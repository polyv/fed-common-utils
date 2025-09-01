import { EventEmitter } from '@/event';

const QUnit = window.QUnit;

QUnit.test('EventEmitter', (assert) => {
  const eventEmitter = new EventEmitter();
  const myName = '我的名称';
  const context = { a: 1 };

  function sayNameHandler(name) {
    assert.strictEqual(name, myName, 'callback params');
    assert.strictEqual(this === context, true, 'callback this');
  }

  eventEmitter.on('sayName', sayNameHandler, context);

  eventEmitter.emit('sayName', myName);
});

QUnit.test('EventEmitterCb', async (assert) => {
  const eventEmitter = new EventEmitter();
  const myName = '我的名称';
  const cbRes = '回调结果';

  function sayNameHandler(name, cb) {
    assert.strictEqual(name, myName, 'callback params');
    cb(cbRes);
  }

  function sayNameHandlerOnce(name, cb) {
    assert.strictEqual(name, myName, 'callback params once');
    cb(cbRes);
  }

  eventEmitter.on('sayName', sayNameHandler);

  eventEmitter.once('sayName', sayNameHandlerOnce);

  eventEmitter.emit('sayName', myName, (res) => {
    assert.strictEqual(res, cbRes, 'event emit res cb');
  });


  eventEmitter.emit('sayName', myName, (res) => {
    assert.strictEqual(res, cbRes, 'event emit res cb2');
  });
});
