/**
 * 本模块提供文件处理相关方法。
 * @packageDocumentation
 */


/**
 * 文件体积单位。
 */
export enum FileSizeUnit {
  B = 'B',
  KB = 'KB',
  MB = 'MB',
  GB = 'GB',
  TB = 'TB'
}

/**
 * 文件体积转换选项。
 */
export interface FileSizeConversionOptions {
  /**
   * 目标单位。
   */
  unit: FileSizeUnit
  /**
   * 是否允许纯小数。
   * 如果不允许，则在保证转换目标值大于 1 的前提下，以距离目标单位最近的单位进行转换。
   * 默认为允许。
   */
  allowPureDecimal?: boolean
}

/**
 * 文件体积转换结果。
 */
export interface FileSizeConversionResult {
  /**
   * 转过结果的值。
   */
  value: number
  /**
   * 转换结果的单位。
   */
  unit: FileSizeUnit
}

/**
 * 转换文件体积。
 * @param sizeInBytes 以字节为单位的文件体积值。
 * @param options 转换选项。
 * @returns 转换结果。
 */
export function convertFileSize(
  sizeInBytes: number,
  options: FileSizeUnit | FileSizeConversionOptions
): FileSizeConversionResult {
  const myOptions = typeof options === 'object'
    ? Object.assign({}, options)
    : { unit: options };

  if (!myOptions.unit) {
    throw new Error('Please specify file size unit');
  }

  const units = [
    FileSizeUnit.B,
    FileSizeUnit.KB,
    FileSizeUnit.MB,
    FileSizeUnit.GB,
    FileSizeUnit.TB
  ];

  const result = {
    value: sizeInBytes,
    unit: myOptions.unit
  };
  units.some((unit, i) => {
    const myValue = sizeInBytes / Math.pow(1024, i);
    if (myOptions.allowPureDecimal === false && myValue < 1) {
      return true;
    } else {
      result.value = myValue;
      result.unit = unit;
    }

    if (myOptions.unit === unit || i === units.length) {
      return true;
    } else {
      return false;
    }
  });

  return result;
}

/**
 * 获取扩展名，支持传入文件名或 URL。
 * @param url 文件名或 URL。
 * @returns 扩展名。
 */
export function getExtname(url: string): string {
  const paths = url
    .replace(/#.*$/, '')
    .replace(/\?.*$/, '')
    .replace(/^([a-z]+:)?\/\/[^/]+/i, '')
    .split('/');

  const matchResult = /\.([a-z0-9]+)$/.exec(paths[paths.length - 1]);
  return matchResult ? matchResult[1].toLowerCase() : '';
}

/**
 * 文件类型。
 */
export enum FileType {
  /**
   * 演示稿。
   */
  PPT = 'ppt',
  /**
   * PDF 文档。
   */
  PDF = 'pdf',
  /**
   * Word 文档。
   */
  Word = 'word',
  /**
   * 图片。
   */
  Image = 'image',
  /**
   * 其他。
   */
  Others = 'others'
}

/**
 * 获取文件类型，支持传入文件名或 URL。
 * @param url 文件名或 URL。
 * @returns 文件类型。
 */
export function getFileType(url: string): FileType {
  const ext = getExtname(url);
  if (['pdf'].indexOf(ext) !== -1) return FileType.PDF;
  if (['doc', 'docx'].indexOf(ext) !== -1) return FileType.Word;
  if (['ppt', 'pptx'].indexOf(ext) !== -1) return FileType.PPT;
  if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'].indexOf(ext) !== -1) return FileType.Image;
  return FileType.Others;
}
