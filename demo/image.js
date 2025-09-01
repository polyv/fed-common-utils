import {
  supportWebP,
  supportAVIF,
  ossCompress,
  cosCompress,
  compressHTMLImgs,
  preloadImg
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

  const SVG_URL = 'https://vod-assets.videocc.net/uploaded/images/2019/12/fii52n6nkh.svg';
  assert.strictEqual(
    ossCompress(SVG_URL, { width: 100, allowWebP: true }),
    SVG_URL
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

  const SVG_URL = 'https://static.kingswayvideo.com/ugplsoje/vod/386936a005/cover.svg';
  assert.strictEqual(
    cosCompress(SVG_URL, { width: 200, allowWebP: true }),
    SVG_URL
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

QUnit.test('preloadImg', async (assert) => {
  const res = await preloadImg('https://nimg.ws.126.net/?url=http%3A%2F%2Fcms-bucket.ws.126.net%2F2025%2F0818%2Fdf366122p00t16x6l008hc001o600vuc.png&thumbnail=660x2147483647&quality=80&type=jpg');
  assert.ok(res.width > 0);
  assert.ok(res.height > 0);
  assert.ok(res.element.tagName === 'IMG');
});
