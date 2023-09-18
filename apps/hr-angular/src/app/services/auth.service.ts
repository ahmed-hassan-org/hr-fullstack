import { inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageKeys } from '@hrCore/models/enum/LocalStorageKeys.enum';
import { LocalStorageService } from '@wapelSharedLib/core/helpers/LocalStorage.service';
import { AppServers } from '@wapelSharedLib/core/models/enum/AppServers.enum';
import { HttpCall } from '@wapelSharedLib/services/http/HttpCall.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper: JwtHelperService = new JwtHelperService();

  private baseUrl = 'auth';
  constructor(
    private http: HttpCall,
    private localStorageService: LocalStorageService
  ) {}

  login(data: any) {
    return this.http.post<any>(
      AppServers.BASE_API_SERVER,
      `${this.baseUrl}/login`,
      data
    );
  }

  register(userData: any) {
    return this.http.post<any>(
      AppServers.BASE_API_SERVER,
      `${this.baseUrl}/register`,
      userData
    );
  }

  /** @description get session detail from session storage */
  getSession() {
    const sessionData = this.localStorageService.getSessionStorage(
      LocalStorageKeys.APP_TOKEN_SESSION
    );
    return sessionData;
  }

  /**
   * @description check if token is expired or not
   * */
  checkTokenExpired(): boolean | Promise<boolean> {
    const session = this.getSession();
    if (session) {
      return this.jwtHelper.isTokenExpired(session.token);
    }
    return new Promise((res, rej) => res(false));
  }
}
