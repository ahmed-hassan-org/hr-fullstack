import { Injectable } from '@angular/core';
import { AppServers } from '@wapelSharedLib/core/models/enum/AppServers.enum';
import { HttpResponseModel } from '@wapelSharedLib/core/models/interfaace/HttpResponseModel.interface';
import { HttpCall } from '@wapelSharedLib/services/http/HttpCall.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = 'dashboard';
  constructor(private http: HttpCall) {}

  getDashboardDetails() {
    return this.http.getAll<HttpResponseModel>(
      AppServers.BASE_API_SERVER,
      `${this.baseUrl}/dashboard-details`
    );
  }
}
