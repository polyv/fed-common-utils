/**
 * 本模块提供链接处理相关方法。
 * @packageDocumentation
 */
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
/** 是否安卓 */
export declare const isAndroid: boolean;
/** 是否 iOS */
export declare const isIOS: boolean;
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
export declare enum LinkType {
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
    Native = 12
}
/**
 * 外链跳转方式
 */
export declare enum LinkJumpWay {
    /**
     * iframe 弹框形式打开
     */
    PopUp = "POP_UP",
    /**
     * 新窗口打开
     */
    NewWindow = "NEW_WINDOW",
    /**
     * 当前窗口打开
     */
    CurrentWindow = "CURRENT_WINDOW"
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
    getPlvWebviewSmallWindowSize?: () => {
        width: number;
        height: number;
    };
    isWxMiniProgramEnv?: () => Promise<boolean | undefined>;
    /** 跳转微信小程序 */
    toWxMiniProgram?: (link: string) => void;
}
/**
 * 格式化链接地址
 * @param url 需要格式化的链接地址
 * @param getLinkParams 获取额外参数的函数，可选
 * @returns 格式化后的链接地址
 */
export declare function formatLink(url: string, getLinkParams?: (url: string) => Record<string, unknown>): string;
/**
 * 根据链接类型和当前环境进行跳转处理
 * @param options 跳转配置项
 * @param options.linkData 链接数据，包含各种平台的链接和跳转方式
 * @param options.getLinkParams 获取链接参数的函数
 * @param options.openLink 通用链接打开处理器
 * @param options.isPlvWebview 判断是否处于保利威 webview 中的函数
 * @param options.isMobile 判断是否移动端的函数
 * @param options.getPlvWebviewSmallWindowSize 获取保利威 webview 小窗尺寸的函数
 * @param options.getPlvWebviewBridge 获取保利威 webview 桥接器的函数
 * @param options.isWxMiniProgramEnv 判断是否处于微信小程序环境的函数
 * @param options.toWxMiniProgram 跳转微信小程序的函数
 */
export declare function navigateToLink(options: NavigateToLinkOptions): void;
export {};
