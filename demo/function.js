import {
  doIfDone
} from '@/function';
const QUnit = window.QUnit;

QUnit.test('doIfDone', (assert) => {
  const done = assert.async();

  let i = 0;
  const fn = doIfDone(function() {
    return new Promise((resolve) => {
      setTimeout(function() {
        i += 1;
        resolve();
      }, 1000);
    });
  });

  fn();
  fn();

  setTimeout(() => {
    fn();
  }, 2000);

  setTimeout(() => {
    assert.strictEqual(i === 2, true);
    done();
  }, 4000);
});
