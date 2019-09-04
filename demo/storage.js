import * as storage from '@/storage';
const QUnit = window.QUnit;

QUnit.test('all', (assert) => {
  const value = '1';
  const obj = { a: 1 };
  const key = 'test';
  const storages = [sessionStorage, localStorage];

  ['session', 'local'].forEach((type, i) => {
    const storageWrap = storage[type];
    const rawStorage = storages[i];

    storageWrap.set(key, value);
    assert.strictEqual(storageWrap.get(key), value);
    assert.strictEqual(rawStorage.getItem(key), value);

    storageWrap.setAsJSON(key, obj);
    assert.strictEqual(rawStorage.getItem(key), JSON.stringify(obj));
    assert.deepEqual(storageWrap.getAsJSON(key), obj);

    storageWrap.remove(key);
    assert.equal(rawStorage.getItem(key), null);
  });
});
