/**
 * 本模块提供浏览器特性检测相关方法。
 * @packageDocumentation
 */
/**
 * 检测当前浏览器是否运行在移动设备上（User-Agent 识别为主，特征判断为辅）。
 * @returns 当前浏览器是否运行在移动设备上。
 */
export declare function isMobile(): boolean;
/**
 * 检测当前浏览器是否具备移动设备特征（特征判断为主，User-Agent 识别为辅）。
 * @returns 当前浏览器是否具备移动设备特征。
 */
export declare function hasMobileFeature(): boolean;
/**
 * 检测当前浏览器是否为傲游浏览器。
 * @returns 当前浏览器是否为傲游浏览器。
 */
export declare function isMaxthon(): boolean;
/**
 * 检测当前浏览器是否支持通过 MSE 播放 H264 视频。
 * @returns 当前浏览器是否支持通过 MSE 播放 H264 视频。
 */
export declare function supportMSEH264(): boolean;
