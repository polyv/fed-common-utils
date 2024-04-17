/**
 * 判断当前浏览器是否运行在移动设备上（User-Agent 识别为主，特征判断为辅）。
 * @returns 当前浏览器是否运行在移动设备上。
 */
export function isMobile() {
  const ua = navigator.userAgent;
  if (
    /mobile|android/i.test(ua) ||
    (/\bMacintosh\b/.test(ua) && navigator.maxTouchPoints)
  ) {
    return true;
  } else if (
    /\b(Windows\sNT|Macintosh|x86(_(32|64))?|amd64|i[1-6]86)\b/.test(ua) ||
    !('onorientationchange' in window)
  ) {
    return false;
  } else {
    return true;
  }
}

/**
 * 判断当前浏览器是否为傲游浏览器。
 * @returns 当前浏览器是否为傲游浏览器。
 */
export function isMaxthon() {
  const ua = navigator.userAgent;
  if (/\bMaxthon\b/i.test(ua)) {
    return true;
  } else if ('maxthon' in window) {
    const maxthon = (<any>window).maxthon as any;
    /* eslint-disable-next-line new-cap */
    return typeof maxthon.IsMaxthon === 'function' && maxthon.IsMaxthon();
  }
  return false;
}

/**
 * 判断当前浏览器是否支持通过 MSE 播放 H264 视频。
 * @returns 当前浏览器是否支持通过 MSE 播放 H264 视频。
 */
export function supportMSEH264() {
  const MediaSource = window.MediaSource;
  return MediaSource &&
    typeof MediaSource.isTypeSupported === 'function' &&
    MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
}
