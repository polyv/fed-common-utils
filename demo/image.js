import {
  supportWebP,
  supportAVIF,
  ossCompress,
  compressHTMLImgs
} from '@/image';

const QUnit = window.QUnit;

QUnit.test('support', async (assert) => {
  const webpResult = supportWebP();
  const avifResult = await supportAVIF();
  console.info('Support WebP: ' + webpResult);
  console.info('Support AVIF: ' + avifResult);
  assert.strictEqual(typeof webpResult, 'boolean');
  assert.strictEqual(typeof avifResult, 'boolean');
});

QUnit.test('ossCompress', (assert) => {
  const URL = 'https://vod-assets.videocc.net/uploaded/images/2019/12/fii52n6nkh.jpg';
  assert.strictEqual(
    ossCompress(URL, {
      allowWebP: true,
      allowAVIF: true
    }),
    URL + '?x-oss-process=image/format,avif'
  );
  assert.strictEqual(
    ossCompress(URL, {
      allowWebP: true
    }),
    URL + '?x-oss-process=image/format,webp'
  );
  assert.strictEqual(
    ossCompress(URL, {
      width: 100,
      height: 100
    }),
    URL + '?x-oss-process=image/resize,w_100,h_100,limit_1'
  );
  assert.strictEqual(
    ossCompress(URL, {
      width: 100,
      height: 100,
      allowWebP: true,
      allowAVIF: true
    }),
    URL + '?x-oss-process=image/resize,w_100,h_100,limit_1/format,avif'
  );
});

QUnit.test('compressHTMLImgs', (assert) => {
  const htmlIn = 'abc<img src="https://liveimages.videocc.net/uploaded/images/2019/12/fii52n6nkh.jpg" />def';
  const htmlOut = 'abc<img src="https://liveimages.videocc.net/uploaded/images/2019/12/fii52n6nkh.jpg?x-oss-process=image/resize,w_100,h_100,limit_1/format,avif" data-src="https://liveimages.videocc.net/uploaded/images/2019/12/fii52n6nkh.jpg" />def';
  assert.strictEqual(
    compressHTMLImgs(htmlIn, {
      width: 100,
      height: 100,
      allowWebP: true,
      allowAVIF: true
    }),
    htmlOut
  );
});
