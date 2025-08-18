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
 * 获取文件扩展名
 * @param fileName 文件名
 * @returns 文件扩展名
 * @example
 * ```typescript
 * const ext = getFileExtension('test.pdf');
 * console.log(ext); // pdf
 * ```
 */
export function getFileExtension(fileName: string): string {
  const ext = fileName.split('.').pop();
  return ext || '';
}

export type FileType = 'pdf' | 'word' | 'ppt' | 'excel' | 'image' | 'other';

/**
 * 根据文件扩展名推断文件类型
 * @param extension 文件扩展名
 * @returns 文件类型
 * @example
 * ```typescript
 * getFileType('test.pdf'); // pdf
 * getFileType('test.docx'); // word
 * getFileType('test.pptx'); // ppt
 * getFileType('test.jpg'); // image
 * getFileType('test.webp'); // image
 * getFileType('test.txt'); // other
 * ```
 */
export function getFileType(fileName: string): FileType {
  const ext = getFileExtension(fileName);
  if (['pdf'].includes(ext)) return 'pdf';
  if (['doc', 'docx'].includes(ext)) return 'word';
  if (['ppt', 'pptx'].includes(ext)) return 'ppt';
  if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'].includes(ext)) return 'image';
  return 'other';
}
