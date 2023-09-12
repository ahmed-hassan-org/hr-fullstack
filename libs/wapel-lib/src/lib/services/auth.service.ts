import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { HttpCall } from './http/HttpCall.service';
import { LocalStorageService } from '@wapelSharedLib/core/helpers/LocalStorage.service';
import { LocalStorageKeysModel } from '@wapelSharedLib/core/models/interfaace/LocalStorageKeysModel.interface';
import {
  LoginModel,
  VerifyOtpModel,
} from '@wapelSharedLib/core/models/interfaace/AppAuthEntity.interface';
import { HttpResponseModel } from '@wapelSharedLib/core/models/interfaace/HttpResponseModel.interface';
import { WapelServers } from '@wapelSharedLib/core/models/enum/WapelServers.enum';
import { JwtHelperService } from '@auth0/angular-jwt';
import { WapelInjectToken } from '@wapelSharedLib/core/token/WapelInjectToken.enum';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper: JwtHelperService = Inject(JwtHelperService);

  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );

  private selectedRole: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private baseUrl = 'auth';
  constructor(
    private http: HttpCall,
    private localStorageService: LocalStorageService,
    @Inject(WapelInjectToken.APP_LOCAL_STORAGE_KEYS)
    private localStoragekeys: LocalStorageKeysModel,
  ) {}

  login(loginData: LoginModel) {
    return this.http.post<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}/login`,
      loginData,
    );
  }

  signout() {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}/signout`,
    );
  }

  verify(verifyOtpData: VerifyOtpModel) {
    return this.http.post<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `${this.baseUrl}/verify`,
      verifyOtpData,
    );
  }

  /** an observable to check if user logged in or not */
  isUserLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  /** @description used to set user logged in or logged out */
  setUserLoggedIn(state: boolean) {
    this.isLoggedIn.next(state);
  }

  /** @description get session detail from session storage */
  getSession() {
    const sessionData = this.localStorageService.getSessionStorage(
      this.localStoragekeys.APP_TOKEN_SESSION as string,
    );
    return sessionData;
  }

  /** get current user mac address in login page */
  getMacIp() {
    return lastValueFrom<any>(
      this.http.getAll<any>(WapelServers.NODE_API_SERVER, `getuserMacIp`),
    );
  }

  getSelectedRole() {
    const seletedRole = this.localStorageService.getSessionStorage(
      this.localStoragekeys.APP_USER_SELECTED_ROLE as string,
    );
    this.setSelectedRole(seletedRole);
    return this.selectedRole.asObservable();
  }

  setSelectedRole(role: any) {
    this.selectedRole.next(role);
  }

  /**
   * @description check if token is expired or not
   * */
  isTokenExpired() {
    const session = this.getSession();
    if (session) {
      return this.jwtHelper.isTokenExpired(session.token);
    }
    return false;
  }

  getProfileData(userNo: any) {
    return this.http.getAll<HttpResponseModel>(
      WapelServers.BASE_API_SERVER,
      `adminController/users/employee/${userNo}`,
    );
  }
}
