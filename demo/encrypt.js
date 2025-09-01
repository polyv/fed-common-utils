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
      'sha256'
    ),
    '42703C82180F933545C0E6E3372B5F6303C3A54F77629AA34C4CE3443F7B3B27'
  );

  assert.strictEqual(
    genAPISign(
      {
        channelIds: '2477096,2272655',
        startDay: '2022-05-20',
        endDay: '2022-06-18',
        appId: 'g4rqgmmjuo',
        timestamp: 1660270926732,
        signatureMethod: 'SHA256'
      },
      'fsq2k5weced1h8vui657xtdva66whf0g'
    ),
    'C19D35BD44B2BD0A538D420D93F80C17EAD9604042098EA38621A2B5663ECEDF'
  );
});
