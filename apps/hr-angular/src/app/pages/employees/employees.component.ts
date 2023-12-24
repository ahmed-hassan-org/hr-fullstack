import { Component, Injector, OnInit, signal } from '@angular/core';
import { LocalStorageKeys } from '@hrCore/models/enum/LocalStorageKeys.enum';
import { IEmployeesModel } from '@hrCore/models/interface/IEmployeesModel.interface';
import { EmployeesService } from '@hrServices/employees.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WapelBase } from '@wapelSharedLib/core/models/classes/WapelBase';
import { PagingMeta } from '../../../../../../libs/wapel-lib/src/lib/core/models/interfaace/PaginaMeta.interface';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'hr-fullstack-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
@UntilDestroy({ checkProperties: true })
export class EmployeesComponent extends WapelBase implements OnInit {
  employeesList = signal<IEmployeesModel[]>([]);
  pageMeta = signal<Partial<PagingMeta>>({ total: 100, perPage: 10 });
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

  getEmployees(size = 10, page = 0) {
    this.empService
      .getAllEmployees(size, page)
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        console.log(data.data);
        this.pageMeta.set(data.data.meta);
        this.employeesList.set(data.data.data);
        this.rowTotalCount.set(this.pageMeta().total as number);
        this.pageSize.set(this.pageMeta().perPage as number);
        this.pageNumber.set(this.pageMeta().currentPage as number);
      });
  }

  onLazyLoad(e: LazyLoadEvent | any) {
    console.log(e);
    let pg = (e.page - 1) * e.rows;
    this.pageNumber.set(pg);
    this.getEmployees(this.pageMeta().perPage, pg);
  }
}
