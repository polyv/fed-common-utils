import { Countdown } from '@/countdown';
const QUnit = window.QUnit;


QUnit.test('countdown', (assert) => {
  const done = assert.async();

  let i = 0;
  const countdown = new Countdown(10, (rest) => {
    i++;
    assert.strictEqual(rest.seconds >= 0 && rest.seconds <= 10, true);
    if (!rest.totalMsecs) {
      // 10 到 0，一共 11 次
      assert.strictEqual(i <= 11, true);
      done();
    }
  });
  countdown.start();
});
