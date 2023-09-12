import { Inject, Injectable } from '@angular/core';
import { EnvironmentModel } from '@wapelSharedLib/core/models/interfaace/EnvironmentModel.interface';
import { WapelInjectToken } from '@wapelSharedLib/core/token/WapelInjectToken.enum';
/**
 * @description uage of this class
 * 1- user can create any number of servers he used to get data from
 * 2- user can use [serverWithApiUrl] method to call the full server or can create his own url with multiple prifixes
 */
@Injectable({
  providedIn: 'root',
})
export class HttpConfigService {
  servers!: any;

  constructor(
    @Inject(WapelInjectToken.APP_ENVIRONMENT) private env: EnvironmentModel,
  ) {
    this.servers = {
      baseServer: {
        baseUrl: `${this.env?.appsUrl?.baseUrl}/`,
      },
      nodeServer: {
        baseUrl: `${this.env?.appsUrl?.nodeUrl}/`,
      },
    };
  }
}
