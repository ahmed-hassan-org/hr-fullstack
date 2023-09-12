import { IUserModel } from './IUsersModel.interface';

export interface ICompanyProfileModel {
  id: string;
  mainCompID: string;
  company_CEO: string;
  name: string;
  ownerID: string;
  logo: string;
  noOfEmp: number;
  registNo: string;
  descriptions: string;
  unifiedNatID: string;
  registStDate: string;
  registExpDate: string;
  establishmentNo: string;
  gosiIntSubNo: string;
  webSiteURL: string;
  facebookURL: string;
  instagramURL: string;
  twitterURL: string;
  linkedInURL: string;
  fDelete: boolean;
  sub_Package: number;
  users: IUserModel;
}
