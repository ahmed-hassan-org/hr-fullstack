export interface LoginModel {
  email: string;
  password: string;
}

export interface LoginResponseModel {}

export interface RolesModel {
  roleId: string;
  roleName: string;
}

export interface VerifyOtpModel {
  code: string;
  password: string;
  userId: string;
}

export interface RegisterModel {
  username: string;
  email: string;
  password: string;
}
