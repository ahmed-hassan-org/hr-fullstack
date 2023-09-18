import { Injectable } from '@angular/core';
import { AppServers } from '@wapelSharedLib/core/models/enum/AppServers.enum';
import { SettingModel } from '@wapelSharedLib/core/models/interfaace/SettingModel.interface';
import { HttpCall } from '@wapelSharedLib/services/http/HttpCall.service';
import { Subject, lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApplicationSettingsService {
  private static appSettings: SettingModel;

  constructor(private http: HttpCall) {}

  /**
   * @description
   * get setting promis, allow user to use await to load setting first and then use it
   * for best usability instead of observable and subscription
   * @returns Promise<SettingModel>
   */
  static get getSettingsModel(): Promise<SettingModel> {
    const settingPro = new Promise<any>((resolve) => {
      resolve(ApplicationSettingsService.appSettings);
    });

    return settingPro;
  }

  /** get settings from backend */
  get getSettings() {
    return this.http.getAll<any>(AppServers.BASE_API_SERVER, `settings`);
  }

  /**
   * @description
   * call this function when app start */
  loadSettingData() {
    return lastValueFrom(this.getSettings);
  }

  /** @description set setting data in the static variable */
  setSetting(data: any) {
    ApplicationSettingsService.appSettings = { ...data };
  }
}
