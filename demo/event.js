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
