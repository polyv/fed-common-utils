import * as qs from '@/querystring';
const QUnit = window.QUnit;

const obj1 = {
  id: '0',
  str: 'hello'
};
const obj2 = {
  id: '0',
  str: 'hello',
  empty: ''
};
const str1 = 'id=0&str=hello';
const str2 = 'id=0&str=hello&empty=';
const options = {
  ignoreEmpty: true
};


QUnit.test('parse', function(assert) {
  assert.deepEqual(qs.parse(str2), obj2);
});

QUnit.test('stringify', function(assert) {
  assert.strictEqual(qs.stringify(obj2), str2);
  assert.strictEqual(
    qs.stringify(obj2, options),
    str1,
    '忽略空值'
  );
});

QUnit.test('append', function(assert) {
  const url1 = 'https://heeroluo.github.io/jraiser/';
  const url2 = 'https://heeroluo.github.io/jraiser/?author=Heero.Law';
  const url3 = 'https://mp.weiqihd.com/mpweb/#/signup/meetingsignup?m=10333';

  assert.strictEqual(
    qs.append(url1, obj1),
    url1 + '?id=0&str=hello',
    '无参数URL'
  );

  assert.strictEqual(
    qs.append(url2, obj1),
    url2 + '&id=0&str=hello',
    '带参数URL'
  );

  assert.strictEqual(
    qs.append('https://mp.weiqihd.com/mpweb/#/signup/meetingsignup?m=10333', obj1),
    'https://mp.weiqihd.com/mpweb/?id=0&str=hello#/signup/meetingsignup?m=10333',
    '带锚点URL'
  );
});
