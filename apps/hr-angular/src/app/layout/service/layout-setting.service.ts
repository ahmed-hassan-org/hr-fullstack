import { ILayoutConfigOptions } from './../core/models/interface/ILayoutConfig.interface';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HrLayoutSettingService {
  private companyLayoutConfig = signal<ILayoutConfigOptions>({
    showLogoSide: false,
  });

  get getCompanyLayoutConfig() {
    return this.companyLayoutConfig;
  }

  set setCompanyLayoutConfig(layoutConfig: ILayoutConfigOptions) {
    this.companyLayoutConfig.mutate((val) => {
      layoutConfig;
    });
  }
}
