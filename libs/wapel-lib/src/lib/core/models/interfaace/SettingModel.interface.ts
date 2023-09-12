export interface SettingModel {
  /**
   * @property number of password enter tries
   * @default `3`
   *  */
  noOfFaildPw?: number;
  /** @property check if `OTP` is enabled or not to show the otp modal and input  */
  enablePwVerifyCode?: boolean | string;
  /**
   * @property check if user must send mac ip or not
   * @default `false`
   * */
  validateMacIp?: boolean;
  /**
   * @property number of minutes to reset and show resend code
   * @default `1`
   */
  verifyCodeMinuts?: number;
  /**
   * @property the length of password field
   * @default `6`
   */
  userPwLength?: number;
  /** @property the directory of uploading files */
  uploadFiles?: string;
  /**
   * @property max size in megabyte for files such as `pdf,docx,xlsx`
   * @default `5MB`
   */
  maxUploadFileSize?: number;
  /**
   * @property max size in megabyte for images such as `.png,.jpg,.jpeg,.svg`
   * @default `1MB`
   */
  maxUploadImageFileSize?: number;
  /**
   * @property  a comma spearted allowed format for files to upload
   * @default `.pdf`
   */
  allowedFileFormat?: string;
  /**
   * @property  a comma spearted allowed format for images to upload
   * @default `.png`
   */
  allowedImageFormat?: string;
  /**
   * @property  application default language
   * @default `ar`
   */
  defaultLanguage?: string;
}
