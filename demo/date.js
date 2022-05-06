import {
  formatDate,
  formatSeconds
} from '@/date';
const QUnit = window.QUnit;

QUnit.test('formatDate', (assert) => {
  assert.strictEqual(
    formatDate(
      new Date(2018, 9, 8, 8, 50, 56),
      'YYYY-MM-DD hh:mm:ss'
    ),
    '2018-10-08 08:50:56',
    '格式化日期对象'
  );

  assert.strictEqual(
    formatDate(
      (new Date(2018, 9, 8, 8, 50, 56)).getTime(),
      'YYYY-MM-DD hh:mm:ss'
    ),
    '2018-10-08 08:50:56',
    '格式化时间戳'
  );
});

QUnit.test('formatSeconds', (assert) => {
  assert.strictEqual(
    formatSeconds(7282),
    '121:22',
    '默认调用'
  );

  assert.strictEqual(
    formatSeconds(3682, { segments: 3 }),
    '01:01:22',
    '三段两位'
  );

  assert.strictEqual(
    formatSeconds(3682, { segments: 3, digits: 1 }),
    '1:1:22',
    '三段一位'
  );

  assert.strictEqual(
    formatSeconds(82, { segments: 2 }),
    '01:22',
    '两段两位'
  );

  assert.strictEqual(
    formatSeconds(82, { segments: 2, digits: 1 }),
    '1:22',
    '两段一位'
  );
});
