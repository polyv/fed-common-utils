/**
 * 本模块提供链接处理相关方法。
 * @packageDocumentation
 */

import { getCurrentUAInfo } from '@just4/ua-info';
import { concat } from '@just4/querystring';

/**
 * 保利威 WebView 桥接器接口
 */
export interface WebViewBridge {
  /**
   * 向 WebView 发送数据
   * @param event 事件
   * @param data 数据对象
   */
  sendData: (event: string, data: Record<string, unknown>) => void;
}

const uaInfo = getCurrentUAInfo();
/** 是否安卓 */
export const isAndroid = uaInfo.os.isAndroid;
/** 是否 iOS */
export const isIOS = uaInfo.os.isIOS;
/** 是否纯血鸿蒙 */
export const isHarmony = uaInfo.os.isOpenHarmony;
/** 是否移动端 */
export const isPortable = uaInfo.isPortable;

/**
 * 外链跳转方式
 */
export enum LinkJumpWay {
  /**
   * iframe 弹框形式打开
   */
  PopUp = 'POP_UP',
  /**
   * 新窗口打开
   */
  NewWindow = 'NEW_WINDOW',
  /**
   * 当前窗口打开
   */
  CurrentWindow = 'CURRENT_WINDOW',
}

/**
 * 链接数据接口
 */
export interface LinkData {
  /**
   * 跳转方式
   */
  jumpWay: LinkJumpWay;
  /**
   * 通用平台跳转链接
   */
  link: string;
  /**
   * PC 端跳转链接
   */
  pcLink: string;
  /**
   * App 链接
   */
  mobileAppLink: string;
  /**
   * 安卓端 app 跳转链接
   */
  androidLink: string;
  /**
   * iOS app 跳转链接
   */
  iosLink: string;
  /**
   * 鸿蒙 app 跳转链接
   */
  harmonyLink: string;
  /**
   * 微信小程序原始 id
   */
  wxMiniprogramOriginalId: string;
  /**
   * 微信小程序应用 id
   */
  wxMiniprogramAppId: string;
  /**
   * 微信小程序内页面路径及参数
   */
  wxMiniprogramLink: string;
}

/**
 * 获取链接参数
 */
export type GetLinkParams = (url: string) => Record<string, unknown>;

/**
 * 跳转链接配置项
 */
export interface NavigateToLinkOptions {
  /** 链接数据 */
  linkData: LinkData;
  /** 是否使用保利威桥接器跳转链接 */
  usePlvWebviewBridge?: boolean;
  /**
   * 获取链接参数
   */
  getLinkParams?: GetLinkParams;
  /** 通用链接打开处理器 */
  openLink: (url: string, jumpWay: LinkJumpWay) => void;
  /** 是否移动端 */
  isMobile?: () => boolean;
  /** 是否处于保利威 webview 中 */
  isPlvWebview?: () => boolean;
  /** 获取保利威 webview 桥接器 */
  getPlvWebviewBridge?: () => Promise<WebViewBridge | undefined>;
  /** 获取保利威 webview 小窗尺寸 */
  getPlvWebviewSmallWindowSize?: () => { width: number; height: number; };
  isWxMiniProgramEnv?: () => Promise<boolean | undefined>;
  /** 跳转微信小程序 */
  toWxMiniProgram?: (link: string) => void;
}

/**
 * 检测自定义环境 UA 配置
 */
export function isCustomUA(uaList: string[]): boolean {
  const currentUA = navigator.userAgent.toLowerCase();

  if (!uaList.length) return false;

  return uaList.some(ua => currentUA.includes(ua.toLowerCase()));
}

/**
 * 通过 URL Scheme 打开 App，失败时跳转兜底链接
 */
export function openAppWithFallback(options: {
  iosLink: string;
  androidLink: string;
  harmonyLink: string;
  fallbackUrl: string;
  jumpWay: LinkJumpWay;
  openLink: (url: string, jumpWay: LinkJumpWay) => void;
}): void {
  const { iosLink, androidLink, harmonyLink, fallbackUrl, jumpWay, openLink } = options;

  const timeout = 3500;
  const start = Date.now();
  let hasBlur = false;

  // 页面失去焦点，通常是成功唤起 App 了
  const onBlur = () => {
    hasBlur = true;
    window.removeEventListener('blur', onBlur);
  };
  window.addEventListener('blur', onBlur);

  console.info(`ios：${isIOS}，Android：${isAndroid}，harmony：${isHarmony}`);
  let url;
  if (isIOS) {
    console.info('iOSLink', iosLink);
    url = iosLink;
  } else if (isAndroid) {
    console.info('Android link', androidLink);
    url = androidLink;
  } else if (isHarmony) {
    console.info('harmony link', harmonyLink);
    url = harmonyLink;
  }
  if (!url) {
    console.info('没有配置多平台链接，使用降级链接', fallbackUrl);
    openLink(fallbackUrl, jumpWay);
  } else {
    window.location.href = url;
  }

  setTimeout(() => {
    window.removeEventListener('blur', onBlur);

    const elapsed = Date.now() - start;
    if (!hasBlur && elapsed < timeout + 200 && fallbackUrl) {
      openLink(fallbackUrl, jumpWay);
    }
  }, timeout);
}

/**
 * 处理 webview
 */
async function toPlvWebviewBridge(options: {
  link: string;
  data: unknown;
  getPlvWebviewSmallWindowSize?: () => { width: number; height: number; } | undefined;
  getPlvWebviewBridge?: () => Promise<WebViewBridge | undefined>;
}) {
  const { getPlvWebviewSmallWindowSize, getPlvWebviewBridge } = options;

  const plvWebviewDataSize = getPlvWebviewSmallWindowSize?.() || { width: 90, height: 160 };

  const webviewBridge = await getPlvWebviewBridge?.();
  if (!webviewBridge) {
    return;
  }

  webviewBridge.sendData('clickProduct', {
    width: plvWebviewDataSize.width,
    height: plvWebviewDataSize.height,
    newPage: true,
    link: options.link,
    data: options.data,
  });
}

/**
 * 处理多平台
 */
async function toMultiPlatformLink(options: {
  linkData: LinkData,
  getLinkParams?: GetLinkParams,
  isWxMiniProgramEnv?: () => Promise<boolean | undefined>,
  toWxMiniProgram?: (link: string) => void;
  openLink: (url: string, jumpWay: LinkJumpWay) => void;
  isMobile?: () => boolean;
}) {
  const { linkData, isWxMiniProgramEnv, toWxMiniProgram, openLink, getLinkParams, isMobile } = options;
  const { wxMiniprogramLink, pcLink, iosLink, androidLink, harmonyLink, link, jumpWay, mobileAppLink } = linkData;
  const isMobilePlatform = isMobile?.() || isPortable;
  console.info('跳转函数收到的数据', linkData);

  let isWxMiniProgramWebview = false;
  try {
    isWxMiniProgramWebview = (await isWxMiniProgramEnv?.()) || false;
  } catch (err) {
    isWxMiniProgramWebview = false;
  }

  // 小程序 webview 环境，利用微信 sdk 跳转指定页面
  if (isWxMiniProgramWebview && toWxMiniProgram) {
    console.info('进入到小程序 webview 环境 wxMiniprogramLink & link', wxMiniprogramLink, link);
    if (wxMiniprogramLink) {
      toWxMiniProgram(formatLink(wxMiniprogramLink, getLinkParams));
    } else {
      openLink(formatLink(link, getLinkParams), LinkJumpWay.CurrentWindow);
    }
    return;
  }

  // PC 端
  if (!isMobilePlatform) {
    openLink(formatLink(pcLink || link, getLinkParams), jumpWay);
    return;
  }

  // 某些 App 下禁用了 url scheme，改用链接跳转
  if (uaInfo.client.isWx || uaInfo.client.isWxWork || uaInfo.client.isDing || uaInfo.client.isQQ || uaInfo.client.isWeibo || uaInfo.client.isBaiduApp) {
    openLink(formatLink(link, getLinkParams), jumpWay);
    return;
  }

  // 优先跳转 App url scheme，否则降级到浏览器链接
  openAppWithFallback({
    iosLink,
    androidLink,
    harmonyLink,
    fallbackUrl: formatLink(mobileAppLink || link, getLinkParams),
    jumpWay,
    openLink,
  });
}

/**
 * 格式化链接地址
 * @param url 需要格式化的链接地址
 * @param getLinkParams 获取额外参数的函数，可选
 * @returns 格式化后的链接地址
 */
export function formatLink(
  url: string,
  getLinkParams?: (url: string) => Record<string, unknown>
): string {
  let urlParams = {};

  if (getLinkParams) {
    const res = getLinkParams(url);
    urlParams = Object.assign({}, urlParams, res);
  }
  return concat(url, urlParams);
}

/**
 * 根据链接类型和当前环境进行跳转处理
 * @param options 跳转配置项
 */
export function navigateToLink(options: NavigateToLinkOptions): void {
  const { linkData, usePlvWebviewBridge, openLink, isPlvWebview, getPlvWebviewSmallWindowSize, getPlvWebviewBridge, isWxMiniProgramEnv, toWxMiniProgram, getLinkParams, isMobile } = options;

  const supportPlvWebview = isPlvWebview?.() || false;
  console.info('是否保利威 webview 环境', supportPlvWebview);

  // 保利威 SDK Webview 下跳转
  if (supportPlvWebview) {
    const { link, iosLink, androidLink, harmonyLink, mobileAppLink, wxMiniprogramOriginalId, wxMiniprogramLink, jumpWay } = linkData;
    const linkTo = mobileAppLink || link;
    console.info('保利威 webview 下的 mobileAppLink，link', mobileAppLink, link);
    console.info('保利威 webview 下 usePlvWebviewBridge', usePlvWebviewBridge);

    // 将其余字段单独放到 data 供接入方使用
    const otherData = {
      mobileLink: formatLink(link, getLinkParams),
      wxMiniprogramOriginalId,
      wxMiniprogramLink: formatLink(wxMiniprogramLink, getLinkParams),
      mobileAppLink: formatLink(mobileAppLink, getLinkParams),
    };

    if (usePlvWebviewBridge) {
      toPlvWebviewBridge({
        link: formatLink(linkTo, getLinkParams),
        data: otherData,
        getPlvWebviewSmallWindowSize,
        getPlvWebviewBridge,
      });
      return;
    }

    openAppWithFallback({
      iosLink,
      androidLink,
      harmonyLink,
      fallbackUrl: formatLink(mobileAppLink || link, getLinkParams),
      jumpWay,
      openLink,
    });
    return;
  }

  toMultiPlatformLink({
    linkData,
    getLinkParams,
    isWxMiniProgramEnv,
    toWxMiniProgram,
    openLink,
    isMobile,
  });
}
