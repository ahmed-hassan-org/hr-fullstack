import { Injectable } from '@angular/core';
import { WapelServers } from '@wapelSharedLib/core/models/enum/WapelServers.enum';
import { HttpCall } from '@wapelSharedLib/services/http/HttpCall.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private baseUrl = 'employees';

  constructor(private http: HttpCall) {}

  getAllEmployees() {
    return this.http.getAll(WapelServers.BASE_API_SERVER, `${this.baseUrl}/employees`);
  }
}
