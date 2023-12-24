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

  getAllEmployees(size = 10, page = 0) {
    return this.http.getAll<HttpResponseModel>(
      AppServers.BASE_API_SERVER,
      `${this.baseUrl}`,
      {
        take: size,
        skip: page,
      }
    );
  }
  getAllEmployeesPaging(page = 1, size = 10) {
    return this.http.getAll<HttpResponseModel>(
      AppServers.BASE_API_SERVER,
      `${this.baseUrl}`
    );
  }
}
