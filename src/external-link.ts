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

type ToPointMallFunc = (params: string) => unknown;
declare global {
  interface Window {
    AndroidNative?: {
      toPointMall?: ToPointMallFunc;
    };
    webkit?: {
      messageHandlers?: {
        gotoPointsMall?: {
          postMessage?: ToPointMallFunc;
        };
      };
    };
  }
}

/**
 * 链接类型
 */
export enum LinkType {
  /**
   * 通用链接
   */
  Normal = 10,
  /**
   * 多平台链接
   */
  MultiPlatform = 11,
  /**
   * 原生方法跳转
   */
  Native = 12,
}

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
   * 链接类型
   */
  linkType: LinkType;
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
   * 移动端跳转链接
   */
  mobileLink: string;
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
   * 其他链接
   */
  otherLink: string;
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
  /**
   * 获取链接参数
   */
  getLinkParams?: GetLinkParams;
  /** 通用链接打开处理器 */
  openLink: (url: string, jumpWay: LinkJumpWay) => void;
  /** 是否处于保利威 webview 中 */
  isPlvWebview?: () => boolean;
  /** 是否移动端 */
  isMobile?: () => boolean;
  /** 获取保利威 webview 桥接器 */
  getPlvWebviewBridge?: () => Promise<WebViewBridge | undefined>;
  /** 获取保利威 webview 小窗尺寸 */
  getPlvWebviewSmallWindowSize?: () => { width: number; height: number; };
  isWxMiniProgramEnv?: () => Promise<boolean | undefined>;
  /** 跳转微信小程序 */
  toWxMiniProgram?: (link: string) => void;
}

/**
   * 获取原生 App 方法
   */
function getNativeToPointMallFn() {
  if (isAndroid) {
    return window.AndroidNative?.toPointMall;
  } else if (isIOS) {
    return window.webkit?.messageHandlers?.gotoPointsMall?.postMessage;
  }
}

/**
 * 调用原生方法跳转
 */
function toNativeLink(options: {
  androidLink: string;
  iosLink: string;
  otherLink: string;
}) {
  const { androidLink, iosLink, otherLink } = options;

  const nativePointMallFn = getNativeToPointMallFn();
  if (nativePointMallFn) {
    let url = isAndroid ? androidLink : iosLink;

    // 处理地址并注入 plt_back_uri
    const pltBackUri = encodeURIComponent(location.href);
    url = concat(url, {
      plt_back_uri: pltBackUri,
    });

    const paramsStr = JSON.stringify({
      url,
    });
    nativePointMallFn(paramsStr);
    return;
  }

  window.open(otherLink, '_blank', 'noopener=yes');
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
  const { wxMiniprogramLink, mobileLink, pcLink } = linkData;
  const isMobilePlatform = isMobile?.() || false;

  let isWxMiniProgramWebview = false;
  try {
    isWxMiniProgramWebview = (await isWxMiniProgramEnv?.()) || false;
  } catch (err) {
    isWxMiniProgramWebview = false;
  }

  // 小程序 webview 环境，利用微信 sdk 跳转指定页面
  if (isWxMiniProgramWebview && wxMiniprogramLink && toWxMiniProgram) {
    toWxMiniProgram(formatLink(wxMiniprogramLink, getLinkParams));
    return;
  }

  // 移动 Web 跳转
  if (isMobilePlatform && mobileLink) {
    openLink(formatLink(mobileLink, getLinkParams), LinkJumpWay.NewWindow);
    return;
  }

  // PC 跳转
  if (!isMobilePlatform && pcLink) {
    openLink(formatLink(pcLink, getLinkParams), LinkJumpWay.NewWindow);
  }
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
  const { linkData, openLink, isPlvWebview, getPlvWebviewSmallWindowSize, getPlvWebviewBridge, isWxMiniProgramEnv, toWxMiniProgram, getLinkParams, isMobile } = options;
  const { linkType } = linkData;

  const supportPlvWebview = isPlvWebview?.() || false;

  // 原生方法跳转
  if (linkType === LinkType.Native) {
    toNativeLink({
      androidLink: formatLink(linkData.androidLink, getLinkParams),
      iosLink: formatLink(linkData.iosLink, getLinkParams),
      otherLink: formatLink(linkData.otherLink, getLinkParams),
    });
    return;
  }

  // 保利威 SDK Webview 下跳转
  if (supportPlvWebview) {
    let linkTo = '';
    const { link, mobileLink, mobileAppLink, wxMiniprogramOriginalId, wxMiniprogramLink } = linkData;

    switch (linkType) {
      case LinkType.Normal:
        linkTo = link;
        break;
      case LinkType.MultiPlatform:
        linkTo = mobileAppLink || mobileLink;
        break;
    }

    // 非通用链接，将其余字段单独放到 data 供接入方使用
    let otherData = null;
    if (linkType !== LinkType.Normal) {
      otherData = {
        mobileLink: formatLink(mobileLink, getLinkParams),
        wxMiniprogramOriginalId,
        wxMiniprogramLink: formatLink(wxMiniprogramLink, getLinkParams),
        mobileAppLink: formatLink(mobileAppLink, getLinkParams),
      };
    }

    toPlvWebviewBridge({
      link: formatLink(linkTo, getLinkParams),
      data: otherData,
      getPlvWebviewSmallWindowSize,
      getPlvWebviewBridge,
    });
    return;
  }

  // 通用平台
  if (linkType === LinkType.Normal) {
    const { link, jumpWay } = linkData;
    openLink(formatLink(link, getLinkParams), jumpWay);
    return;
  }

  // 多平台跳转
  if (linkType === LinkType.MultiPlatform) {
    toMultiPlatformLink({
      linkData,
      getLinkParams,
      isWxMiniProgramEnv,
      toWxMiniProgram,
      openLink,
      isMobile,
    });
  }
}
