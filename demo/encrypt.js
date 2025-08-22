import { genAPISign } from '@/encrypt';

const QUnit = window.QUnit;

QUnit.test('genAPISign', (assert) => {
  assert.strictEqual(
    genAPISign(
      {
        channelIds: '2477096,2272655',
        startDay: '2022-05-20',
        endDay: '2022-06-18',
        appId: 'g4rqgmmjuo',
        timestamp: 1660270926732
      },
      'fsq2k5weced1h8vui657xtdva66whf0g',
    ),
    '0D2BDA2FD04D93A2B8832B91FD973C4D'
  );
});
