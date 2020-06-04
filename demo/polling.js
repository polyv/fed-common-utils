import Polling from '@/polling';
const QUnit = window.QUnit;

/* eslint-disable sonarjs/no-identical-functions */

QUnit.test('polling', (assert) => {
  const done = assert.async();

  let i = 0;
  const polling = new Polling(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        i += 1;
        resolve();
      }, 0);
    });
  }, {
    interval: 2000
  });

  polling.start();

  setTimeout(() => {
    polling.stop();

    assert.strictEqual(i === 5, true);

    setTimeout(() => {
      assert.strictEqual(i === 5, true, '已停止');

      polling.execImmediately();
      setTimeout(() => {
        assert.strictEqual(i === 6, true, '立刻执行');
        done();
      }, 100);
    }, 3000);
  }, 9.5 * 1000);
});
