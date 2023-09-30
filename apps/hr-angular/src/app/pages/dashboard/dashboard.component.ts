import {
  Component,
  OnInit,
  Injector,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LayoutService } from '../../layout/service/app.layout.service';
import { WapelBase } from '@wapelSharedLib/core/models/classes/WapelBase';
import { LocalStorageKeys } from '@hrCore/models/enum/LocalStorageKeys.enum';
import { EmployeesService } from '@hrServices/employees.service';
import { DashboardService } from '@hrServices/dashboard.service';

@Component({
  selector: 'hr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
@UntilDestroy({ checkProperties: true })
export class DashboardComponent extends WapelBase implements OnInit {
  override currentLanguage = signal('');
  dashboardDetails = signal<any>({});
  constructor(
    injector: Injector,
    public layoutService: LayoutService,
    private dashboardService: DashboardService
  ) {
    super(injector);
    this.messageTranslationPrefix = 'PAGES.DASHBOARD-PAGE-WRAPPER.MESSAGES.';
  }

  async ngOnInit() {
    this.getAppLanguage();
    this.getDashboardDetails();
  }

  override getAppLanguage(): void {
    this.currentLanguage.set(
      this.getFusionHelper().getActiveLanguage(LocalStorageKeys.APP_LANG)
    );
    this.getTranslation()
      .onLangChange.pipe(untilDestroyed(this))
      .subscribe((lang) => {
        this.currentLanguage.set(lang?.lang);
      });
  }

  getDashboardDetails() {
    this.dashboardService
      .getDashboardDetails()
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        console.log(data.data);
        this.dashboardDetails.set(data.data);
      });
  }
}
