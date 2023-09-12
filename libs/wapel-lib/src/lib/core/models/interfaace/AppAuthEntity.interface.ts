export interface LoginModel {
  userId: string;
  password: string;
  macIp: string;
  rememberMe?: boolean;
}

export interface LoginResponseModel {
  /** login data */
  appDate?: string;
  arabicName?: string;
  englishName?: string;
  availableRoles?: RolesModel[];
  /** the current used role for user */
  currentRole?: RolesModel;
  /** mean branch code */
  brCode?: number;
  /** meaning branch name */
  brName?: string;
  /** head quarter */
  hq?: number;
  /** logged in language */
  langCode?: string;
  /** */
  mcCode: number;
  token?: string;
  /** current logged in user id */
  usrId?: string;
  usrno?: number;
  countryId?: number;
}

export interface RolesModel {
  roleId: string;
  roleName: string;
}

export interface VerifyOtpModel {
  code: string;
  password: string;
  userId: string;
}
