/**
 * 检测当前浏览器是否运行在移动设备上（User-Agent 识别为主，特征判断为辅）。
 * @returns 当前浏览器是否运行在移动设备上。
 */
export function isMobile() {
  const ua = navigator.userAgent;
  if (/mobile|android/i.test(ua)) {
    return true;
  } else if (/\b(Windows\sNT|Macintosh|x86(_(32|64))?|amd64|i[1-6]86)\b/.test(ua)) {
    return false;
  } else {
    return 'onorientationchange' in window;
  }
}

/**
 * 检测当前浏览器是否具备移动设备特征（特征判断为主，User-Agent 识别为辅）。
 * @returns 当前浏览器是否具备移动设备特征。
 */
export function hasMobileFeature() {
  const platform = navigator.platform;
  if (
    'onorientationchange' in window &&
    typeof window.orientation === 'number'
  ) {
    return true;
  } else if (/^(iPhone|iPod|iPad)/.test(platform)) {
    return true;
  } else if (platform === 'Win32' || /^Linux\s*(x86|i686)/.test(platform)) {
    return false;
  } else if (platform === 'MacIntel' || platform === 'Macintosh') {
    return navigator.maxTouchPoints > 0;
  } else if (typeof matchMedia !== 'undefined') {
    // 这个判断在触屏电脑上的结果是 true，存在误判可能性，所以优先级放到最后
    return matchMedia('(hover: none)').matches &&
      matchMedia('(pointer: coarse)').matches &&
      !matchMedia('(pointer: fine)').matches;
  } else {
    return false;
  }
}


/**
 * 检测当前浏览器是否为傲游浏览器。
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
 * 检测当前浏览器是否支持通过 MSE 播放 H264 视频。
 * @returns 当前浏览器是否支持通过 MSE 播放 H264 视频。
 */
export function supportMSEH264() {
  const MediaSource = window.MediaSource;
  return MediaSource &&
    typeof MediaSource.isTypeSupported === 'function' &&
    MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
}
