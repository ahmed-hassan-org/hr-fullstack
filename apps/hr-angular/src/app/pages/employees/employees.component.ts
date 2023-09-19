import { Component, Injector, OnInit, signal } from '@angular/core';
import { LocalStorageKeys } from '@hrCore/models/enum/LocalStorageKeys.enum';
import { IEmployeesModel } from '@hrCore/models/interface/IEmployeesModel.interface';
import { EmployeesService } from '@hrServices/employees.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WapelBase } from '@wapelSharedLib/core/models/classes/WapelBase';

@Component({
  selector: 'hr-fullstack-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
@UntilDestroy({ checkProperties: true })
export class EmployeesComponent extends WapelBase implements OnInit {
  employeesList = signal<IEmployeesModel[]>([]);
  constructor(injector: Injector, private empService: EmployeesService) {
    super(injector);
    this.messageTranslationPrefix = '';
  }

  ngOnInit(): void {
    this.getAppLanguage();
    this.getEmployees();
  }

  override getAppLanguage(): void {
    this.currentLanguage.set(
      this.getFusionHelper().getActiveLanguage(LocalStorageKeys.APP_LANG)
    );
    this.getTranslation()
      .onDefaultLangChange.pipe(untilDestroyed(this))
      .subscribe((lang) => {
        this.currentLanguage.set(lang?.lang);
      });
  }

  getEmployees() {
    this.empService
      .getAllEmployees()
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        console.log(data.data);

        this.employeesList.set(data.data);
      });
  }
}
