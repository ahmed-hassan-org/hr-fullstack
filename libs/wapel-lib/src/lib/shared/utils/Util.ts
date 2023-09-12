import * as _lodash from 'lodash';
export class Utils {
  /** replace null value by empty string */
  static replaceNullValuesToEmpty(data: any) {
    if (data) {
      //replace null values to string empty
      const fixedData = JSON.parse(
        JSON.stringify(data, function (key, value) {
          return value === null ? '' : value;
        }),
      );
      return fixedData;
    } else {
      return {};
    }
  }

  /** get property from object that have values only */
  static getObjectPropertyWithvalue(obj: any) {
    return _lodash.omitBy(obj, (v) => !v);
  }

  static getFileExtension(fileName: string) {
    const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
    return fileExtension;
  }

  static getFileSize(fileSize: number) {
    return fileSize * 1024 * 1024;
  }

  /** @description this function is ued to return the enum key by pass the value */
  static getEnumKeyByValue<T extends { [index: string]: number }>(
    enumObject: T,
    value: number,
  ): keyof T | undefined {
    console.log(enumObject);
    console.log(
      Object.keys(enumObject).find((key) => enumObject[key] === value),
    );

    return Object.keys(enumObject).find((key) => enumObject[key] === value);
  }
}
