import { WapelServers } from '@wapelSharedLib/core/models/enum/WapelServers.enum';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpCall } from '../../../../../libs/wapel-lib/src/lib/services/http/HttpCall.service';
import { HttpResponseModel } from '@wapelSharedLib/core/models/interfaace/HttpResponseModel.interface';

@Injectable({
  providedIn: 'root',
})
export class ApplicationLookupsService {
  static treeMenuData: any = null;
  private baseUrl = 'adminController/';
  constructor(private http: HttpCall) {}

  getAllRegions() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}address/region`
    );
  }

  getAllCountry(regionCode?: number) {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}address/country`,
      { regionId: regionCode }
    );
  }
  getAllState(regionCode?: number, countryCode?: number) {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}address/state`,
      { countryId: countryCode }
    );
  }

  getAllCity(regionCode: number, countryCode: number, stateCode?: number) {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}address/city`,
      { regionId: regionCode, countryId: countryCode, stateId: stateCode }
    );
  }
  getAllVillage(regionId: number, countryId: number, stateId: number, cityId: number) {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}address/village`,
      { regionId, countryId, stateId, cityId }
    );
  }

  getOneVillage(seqId: any) {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}address/village/${seqId}`
    );
  }

  createVillage(data: any) {
    return this.http.post<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}address/village`,
      data
    );
  }

  updateVillage(data: any) {
    return this.http.update<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}address/village`,
      data
    );
  }

  deleteVillage(seq: any) {
    return this.http.delete<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}address/village/${seq}`
    );
  }

  /** return side menu tree based on user role */
  getTreeOfPages(roleId: string) {
    return lastValueFrom(
      this.http.getAll<HttpResponseModel>(
        WapelServers.BASE_API_SERVER,
        `lookups/users/treeOfpages`,
        { roleId: roleId }
      )
    );
  }

  // branch api

  getAllbranches() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}branch/getAllBranches`
    );
  }

  getOnebranches(brcode: number) {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}branch/${brcode}`
    );
  }

  addBranch(data: any) {
    return this.http.post<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}branch`,
      data
    );
  }

  updateBranch(data: any) {
    return this.http.update<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}branch`,
      data
    );
  }

  deleteBranch(brcode: number) {
    return this.http.delete<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}branch/${brcode}`,
      {}
    );
  }

  copyBranchData(brcode: number) {
    return this.http.post<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}branch/copyBranch/${brcode}`,
      {}
    );
  }

  // economy sector //

  getAllEconomySector() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}economy/economic`
    );
  }

  getAllEconomySectorLevel2WithParam(econCode1: any) {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}economy/economy2?codeId1=${econCode1}`
    );
  }

  getAllEconomySectorLevel3WithParam(econCode1: any, econCode2: any) {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}economy/economy3?codeId1=${econCode1}&codeId2=${econCode2}`
    );
  }

  getAllEconomySectorLevel2(filter?: any) {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}economy/economy2`,
      filter ? { ...filter } : {}
    );
  }

  getAllEconomySectorLevel3() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}economy/economy3`
    );
  }

  getOneEconomy(id: any) {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}economy/${id}`
    );
  }

  addEconomyAnalytic(data: any) {
    return this.http.post<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}economy/economy2`,
      data
    );
  }

  addEconomySubsidiary(data: any) {
    return this.http.post<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}economy/economy3`,
      data
    );
  }

  editEconomyAnalytic(data: any) {
    return this.http.update<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}economy/economy2`,
      data
    );
  }

  editEconomySubsidiary(data: any) {
    return this.http.update<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}economy/economy3`,
      data
    );
  }

  // setting apis

  getAllSetting() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}sysUserParameters`
    );
  }

  getFundStatus() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/SRV_STATUS`
    );
  }

  updateSettingValues(data: any) {
    return this.http.update<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}sysUserParameters`,
      data
    );
  }

  ///// << get product types >> /////

  getAllProduct() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/products`
    );
  }

  getAllLoanTypeByProduct(prodId: any) {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/productsTypes/${prodId}`
    );
  }

  getAllProductTypes() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/productsTypes`
    );
  }

  getAllPoductTypes() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/PRODUCT_TYPE`
    );
  }

  getDomainSystemAllEntry() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/ENTRY_METHOD`
    );
  }

  getDomainSystemLoanStatus() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/NEW`
    );
  }

  getDomainSystemBranchRisk() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/OPEND`
    );
  }

  getDomainSystemInterestCalculationTypes() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/INTEREST_CALC_TYPE`
    );
  }

  getDomainSystemInterestVariable() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/INT_VARIABLE`
    );
  }

  getInstallmentPeriod() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/PERIOD`
    );
  }

  getDomainSystemBranchReason() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}domainsUserData/byCatId/RISK_REASON`
    );
  }

  getDomainSystemExpensesType() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/EXPENSES_TYPE`
    );
  }

  getDomainSystemCollectType() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/EXPENSES_COLLECT_TYPE`
    );
  }

  getGenders() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `adminController/domainsUserData/byCatId/CIF_GENDER`
    );
  }

  getInstallmentAvailableDays() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/DAYS`
    );
  }

  getDestributeOfBenifited() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/GRACE_PERIOD_TYPE`
    );
  }

  getPaymentDirectUpdate() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/AUTOPAY_TYPE`
    );
  }

  getAllDebts() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/DEBIT`
    );
  }

  getPenaltyCalcTypes() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/CALC_DAYS_TYPE`
    );
  }

  getPenaltyCalcMethod() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/PENALTY_CALC_METHOD`
    );
  }

  getInstallmentPenalty() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/PENALTY_MAX_CALC`
    );
  }

  getWorkProcedure() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `adminController/domainsUserData/byCatId/WF_NAME`
    );
  }

  getFundingSource() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `product-setup/funding-sources`
    );
  }

  getExchangeSource() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/ISSUE_SOURCE`
    );
  }

  getInsuranceCompanies() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `product-setup/insurance-companies`
    );
  }

  getInsuranceType() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/INSURANCE_TYPE`
    );
  }
  getIscoreStatus() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/ISCORE_STATUS`
    );
  }
  getAllBasicData() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}domainsUserData/getAllCategory`
    );
  }

  deleteBasicData(data: any) {
    return this.http.delete<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}domainsUserData`,
      data
    );
  }

  getOneBasicData(catId: string) {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}domainsUserData/byCatId/${catId}`
    );
  }

  createBasicData(data: any) {
    return this.http.post<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}domainsUserData`,
      data
    );
  }

  updateBasicData(data: any) {
    return this.http.update<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}domainsUserData`,
      data
    );
  }

  getDomainSystemRoles() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}domainsUserData/byCatId/ROLES`
    );
  }

  getOneRoles(codeId: any) {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}roles/adminDomainsPageByCode?codeId=${codeId}`
    );
  }

  deleteRole(codeId: any) {
    return this.http.delete<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}roles/adminDomainsPage`,
      codeId
    );
  }

  getAllPagesLookup() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}roles/pages`
    );
  }

  getAllReportsLookup() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}roles/reports`
    );
  }

  updateRole(data: any) {
    return this.http.update<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}roles/adminRoles`,
      data
    );
  }

  createRole(data: any) {
    return this.http.post<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}roles/adminRoles`,
      data
    );
  }

  getGlKind() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/GLKIND`
    );
  }

  getAllGlNumber() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `finance/gl`
    );
  }

  getSubGlNumber(glNo: number) {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `finance/glSub/subNameByGl/${glNo}`
    );
  }

  getGrantors() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `adminController/domainsUserData/byCatId/GRANTEES_CODE`
    );
  }

  getGrantorSeq() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/SEQ`
    );
  }

  getAllCurrency() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `finance/currency`
    );
  }

  /**
   * @description used to get all trans type value can be
   * bank/ broker account
   */
  getAllTransfearType() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/BR_TRANS_TYPE`
    );
  }

  //users url's
  getEmployeStatus() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/EMP_STATUS`
    );
  }
  getEmployeUserBlock() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/BLOCKED`
    );
  }
  getYesOrNoLookup() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/YN`
    );
  }

  getAllUsers() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}users/allAdminUser`
    );
  }

  deleteUser(usrno: any) {
    return this.http.delete<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}users/${usrno}`
    );
  }

  copyUser(usrno: any) {
    return this.http.post<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}users/copyUserProc`,
      {},
      { userNo: usrno }
    );
  }

  getOneUser(userno: any) {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}users/${userno}`
    );
  }

  createUser(data: any) {
    return this.http.post<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}users`,
      data
    );
  }

  updateUser(data: any) {
    return this.http.update<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}users`,
      data
    );
  }
  //users url's

  //Banks url's
  getAllBanks() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `adminController/domainsUserData/byCatId/BANK`
    );
  }

  getAllDocuments() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/DOC_TYPE`
    );
  }

  getDocumentsSubtype(docType: unknown) {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `adminController/documents/${docType}`
    );
  }

  getAllDocumentsSubtype() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `adminController/documents`
    );
  }

  getAllWorkflowStage() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `adminController/domainsUserData/byCatId/WF_STAGE`
    );
  }

  getAllReviewStageById(wfCode: any) {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `product-setup/wf/wfAllSatges/${wfCode}`
    );
  }

  getAllStageRoles() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `adminController/roles/reports`
    );
  }

  getAllUserByBranchCode(brcode: number) {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/users/getLovUserByBrcode`,
      { brCode: brcode }
    );
  }
  //Banks url's

  // tree details
  setTreeMenudata(data: any) {
    ApplicationLookupsService.treeMenuData = data;
  }

  get getTreeMenuData() {
    const treepromise = new Promise<any>((res, rej) => {
      res(ApplicationLookupsService.treeMenuData);
    });
    return treepromise;
  }

  getReputationLevels() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/LEVELES`
    );
  }

  getRefuseReasons() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/WF_ITEMS_REJECTED`
    );
  }

  getRatingtransperance() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/REVIEW_STATUS`
    );
  }

  getAllWorkRisk() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/RISK`
    );
  }

  getAllPermissions() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}domainsUserData/byCatId/ROLES`
    );
  }

  getWithdrawScope() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/WF_REV_REG`
    );
  }

  getWorkflowTabsPersonal() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/WF_TABS_MICRO`
    );
  }

  getWorkflowTabsSME() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `lookups/domainsSysData/WF_TABS_SME`
    );
  }
}
