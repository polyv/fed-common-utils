/**
 * 本模块提供文件处理相关方法。
 * @packageDocumentation
 */
/**
 * 文件体积单位。
 */
export declare enum FileSizeUnit {
    B = "B",
    KB = "KB",
    MB = "MB",
    GB = "GB",
    TB = "TB"
}
/**
 * 文件体积转换选项。
 */
export interface FileSizeConversionOptions {
    /**
     * 目标单位。
     */
    unit: FileSizeUnit;
    /**
     * 是否允许纯小数。
     * 如果不允许，则在保证转换目标值大于 1 的前提下，以距离目标单位最近的单位进行转换。
     * 默认为允许。
     */
    allowPureDecimal?: boolean;
}
/**
 * 文件体积转换结果。
 */
export interface FileSizeConversionResult {
    /**
     * 转过结果的值。
     */
    value: number;
    /**
     * 转换结果的单位。
     */
    unit: FileSizeUnit;
}
/**
 * 转换文件体积。
 * @param sizeInBytes 以字节为单位的文件体积值。
 * @param options 转换选项。
 * @returns 转换结果。
 */
export declare function convertFileSize(sizeInBytes: number, options: FileSizeUnit | FileSizeConversionOptions): FileSizeConversionResult;
/**
 * 获取扩展名，支持传入文件名或 URL。
 * @param url 文件名或 URL。
 * @returns 扩展名。
 */
export declare function getExtname(url: string): string;
/**
 * 文件类型。
 */
export declare enum FileType {
    /**
     * 演示稿。
     */
    PPT = "ppt",
    /**
     * PDF 文档。
     */
    PDF = "pdf",
    /**
     * Word 文档。
     */
    Word = "word",
    /**
     * Excel 表格。
     */
    Excel = "excel",
    /**
     * 图片。
     */
    Image = "image",
    /**
     * 文本文件。
     */
    Txt = "txt",
    /**
     * 压缩文件。
     */
    Zip = "zip",
    /**
     * 其他。
     */
    Others = "others"
}
/**
 * 获取文件类型，支持传入文件名或 URL。
 * @param url 文件名或 URL。
 * @returns 文件类型。
 */
export declare function getFileType(url: string): FileType;
