import { Injectable } from '@angular/core';
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
   * get setting promis, allow user to use await to load setting firsrt and then use it
   * for best usability instead of observable and subscription
   * @returns Promise<SettingModel>
   */
  static get getSettingsModel(): Promise<SettingModel> {
    const settingPro = new Promise<any>((resolve) => {
      resolve(ApplicationSettingsService.appSettings);
    });

    return settingPro;
  }

  /**
   * @description
   * call this function when app start */
  loadSettingData() {
    return lastValueFrom(new Subject());
  }

  /** @description set setting data in the static variable */
  setSetting(data: any) {
    ApplicationSettingsService.appSettings = { ...data };
  }
}
