import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpContext,
  HttpContextToken,
  HttpHeaders,
} from '@angular/common/http';
import { HttpConfigService } from './HttpConfig.service';
import { Observable } from 'rxjs';
import { AppServers } from '@wapelSharedLib/core/models/enum/AppServers.enum';

@Injectable({
  providedIn: 'root',
})
export class HttpCall {
  actionUrl: string;
  urlHeaders = new HttpHeaders();
  spinnerNanme = 'httpLoaderSpinner';
  IS_SPINNER_ENABLED: HttpContextToken<boolean> = new HttpContextToken(
    () => true,
  );

  constructor(private http: HttpClient, private config: HttpConfigService) {
    this.actionUrl = this.config.servers.baseServer.baseUrl;
  }

  /**
   * @description get all data from selected server user must pass the `uri`
   * @example getAll('posts/post'), `or` getAll('/employees)
   * @param uri `string`
   */
  public getAll<T>(
    serverId: AppServers,
    uri?: string,
    queryParams?: any,
    headers?: any,
    httpContext: HttpContext = new HttpContext().set(
      this.IS_SPINNER_ENABLED,
      true,
    ),
  ): Observable<T> {
    return this.http.get<T>(
      `${this.getServerByName(serverId)}${uri ? uri : ''}`,
      {
        params: queryParams ?? {},
        context: httpContext,
        headers: headers ?? {},
      },
    );
  }

  /**
   * @description get one object from selected server user must pass the `uri`
   * @example getOne('/posts','/1'), getOne('/employees,'/1')
   * @param uri `string`
   * @param id `string`
   */
  public getOne<T>(
    serverId: AppServers,
    uri: string,
    id?: string,
    queryparams?: any,
    headers?: any,
    responseType?: 'json',
    httpContext: HttpContext = new HttpContext().set(
      this.IS_SPINNER_ENABLED,
      true,
    ),
  ): Observable<T> {
    return this.http.get<T>(
      `${this.getServerByName(serverId)}${uri ? uri : ''}${id ? id : ''}`,
      {
        params: queryparams ?? {},
        headers: headers ?? {},
        responseType: responseType,
        context: httpContext,
      },
    );
  }

  public getOneCustom<T>(
    serverId: AppServers,
    uri: string,
    id?: string,
    queryParams?: any,
    httpContext: HttpContext = new HttpContext().set(
      this.IS_SPINNER_ENABLED,
      true,
    ),
  ) {
    return this.http.get<T>(
      `${this.getServerByName(serverId)}${uri ? uri : ''}${id ? id : ''}`,
      {
        responseType: 'text' as 'json',
        params: queryParams ?? {},
        context: httpContext,
      },
    );
  }

  /**
   * @description update method used to update object
   * @param `uri` @type `string` the uri for end point
   * @param `updateObject` the object that you will send to end point api to update it, must contain the `id/s` for the object
   * @returns `Observable<T>`
   */
  public update<T>(
    serverId: AppServers,
    uri: string,
    objectToUpdate: any,
    queryPrams?: any,
    headers?: any,
    httpContext: HttpContext = new HttpContext().set(
      this.IS_SPINNER_ENABLED,
      true,
    ),
  ): Observable<T> {
    return this.http.put<T>(
      `${this.getServerByName(serverId)}${uri}`,
      objectToUpdate,
      {
        params: queryPrams ?? {},
        context: httpContext,
        headers: headers ?? {},
      },
    );
  }

  /** used to post data to backend server
   * @param serverId
   * @param uri
   * @param object
   * @param queryparams @type `optional`
   */
  public post<T>(
    serverId: AppServers,
    uri: string,
    data: any,
    queryPrams?: any,
    httpContext: HttpContext = new HttpContext().set(
      this.IS_SPINNER_ENABLED,
      true,
    ),
  ): Observable<T> {
    return this.http.post<T>(`${this.getServerByName(serverId)}${uri}`, data, {
      params: queryPrams ? queryPrams : {},
      context: httpContext,
    });
  }

  /** @description used to perform delete method */
  public delete<T>(
    serverId: AppServers,
    uri: string,
    data?: any,
    queryPrams?: any,
    httpContext: HttpContext = new HttpContext().set(
      this.IS_SPINNER_ENABLED,
      true,
    ),
  ): Observable<T> {
    return this.http.delete<T>(`${this.getServerByName(serverId)}${uri}`, {
      params: queryPrams ? queryPrams : {},
      body: data ? data : {},
      context: httpContext,
    });
  }

  /** @description return the full base url */
  private getBaseUrl() {
    return this.config.servers.baseServer.baseUrl;
  }

  ///////////////////////////////////////////////////////////////////////////
  /**
   * @description this method is used to return the server based on function need
   * */
  private getServerByName(serverId: AppServers | number) {
    let server = '';

    switch (serverId) {
      case AppServers.BASE_API_SERVER:
        server = this.config.servers.baseServer.baseUrl;
        break;
      case AppServers.NODE_API_SERVER:
        server = this.config.servers.nodeServer.baseUrl;
        break;
    }
    return server;
  }
}
