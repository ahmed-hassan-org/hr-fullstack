import { Injectable } from '@angular/core';
import { AppServers } from '@wapelSharedLib/core/models/enum/AppServers.enum';
import { HttpResponseModel } from '@wapelSharedLib/core/models/interfaace/HttpResponseModel.interface';
import { HttpCall } from '@wapelSharedLib/services/http/HttpCall.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private baseUrl = 'employees';

  constructor(private http: HttpCall) {}

  getAllEmployees() {
    return this.http.getAll<HttpResponseModel>(
      AppServers.BASE_API_SERVER,
      `${this.baseUrl}`
    );
  }
}
