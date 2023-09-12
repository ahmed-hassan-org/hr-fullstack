import { DomSanitizer } from '@angular/platform-browser';
import {
  blobToDataURL,
  blobToBase64String,
  base64StringToBlob,
} from 'blob-util';
export class ImageUtil {
  constructor(private sanitizer: DomSanitizer) {}

  /**
   * @description `base64ToBlob` method is used to convert the base64 string to blob
   */
  static base64ToBlob(base64String: string, type?: 'application/pdf') {
    return base64StringToBlob(base64String, type ? type : '');
  }
  /**
   * @description `imageToBase64` method is used to convert the image file to base64 string
   */

  static convertImageToBase64(fileObject: any) {
    const allImagesBase64Array: string[] = [];
    const allFiles = fileObject.target.files;
    Object.keys(allFiles).forEach((itemKey) => {
      blobToDataURL(allFiles[itemKey])
        .then(async (data) => {
          allImagesBase64Array.push(await data);
        })
        .catch((err) => {
          throw Error(err);
        });
    });

    return allImagesBase64Array;
  }

  /** convert blob to base64 */
  static async convertBlobToBase64(blob: any) {
    blob;
    // blob data
    return await blobToBase64String(blob);
  }

  static blobToBase64(blob: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  /**
   * @description `base64ToImage` method is used to convert the base64 string to image and you can see it with HTML `img` tag
   * @param `base64String` string
   */
  base64ToImage(base64String: string) {
    return this.sanitizer.bypassSecurityTrustUrl(
      `'data:image/jpg;base64,${base64String}`,
    );
  }
}
