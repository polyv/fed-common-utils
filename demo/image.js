import {
  supportWebP,
  supportAVIF,
  ossCompress,
  cosCompress,
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
      allowAVIF: true
    }),
    URL + '?x-oss-process=image/format,avif'
  );
  assert.strictEqual(
    ossCompress(URL, {
      allowWebP: 'auto'
    }),
    URL + '?x-oss-process=image/format,webp/quality,Q_80'
  );
  assert.strictEqual(
    ossCompress(URL, 100),
    URL + '?x-oss-process=image/resize,w_100,limit_1/format,webp/quality,Q_80'
  );
  assert.strictEqual(
    ossCompress(URL, {
      width: 100,
      height: 100
    }),
    URL + '?x-oss-process=image/resize,w_100,h_100,limit_1/format,webp/quality,Q_80'
  );
  assert.strictEqual(
    ossCompress(URL + '?x-oss-process=image/resize,w_50,h_50/format,png/quality,q_60/crop,x_800,y_50', {
      width: 100,
      height: 100
    }),
    URL + '?x-oss-process=image/crop,x_800,y_50/resize,w_100,h_100,limit_1/format,webp/quality,Q_80'
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

QUnit.test('cosCompress', (assert) => {
  const URL = 'https://static.kingswayvideo.com/ugplsoje/vod/386936a005/cover.jpg';
  assert.strictEqual(
    cosCompress(URL, { allowWebP: true }),
    URL + '?imageMogr2/format/webp/quality/80'
  );
  assert.strictEqual(
    cosCompress(URL, { width: 200, allowWebP: true }),
    URL + '?imageMogr2/thumbnail/200x/format/webp/quality/80'
  );
  assert.strictEqual(
    cosCompress(URL, { width: 200, height: 300, allowWebP: false }),
    URL + '?imageMogr2/thumbnail/200x300/format/jpg/quality/80'
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
