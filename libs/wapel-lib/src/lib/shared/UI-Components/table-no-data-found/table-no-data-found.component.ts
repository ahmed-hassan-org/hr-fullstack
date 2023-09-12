import { Component, Inject, Injector, OnInit, signal } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WapelBase } from '@wapelSharedLib/core/models/classes/WapelBase';
import { LocalStorageKeysModel } from '@wapelSharedLib/core/models/interfaace/LocalStorageKeysModel.interface';
import { WapelInjectToken } from '@wapelSharedLib/core/token/WapelInjectToken.enum';

@Component({
  standalone: true,
  selector: 'wapel-erp-table-no-data-found',
  templateUrl: './table-no-data-found.component.html',
  styleUrls: ['./table-no-data-found.component.scss'],
})
@UntilDestroy({ checkProperties: true })
export class TableNoDataFoundComponent extends WapelBase {
  override currentLanguage = signal('');
  constructor(
    injector: Injector,
    @Inject(WapelInjectToken.APP_LOCAL_STORAGE_KEYS)
    public localStorage: LocalStorageKeysModel,
  ) {
    super(injector);
  }

  override getAppLanguage(): void {
    this.currentLanguage.set(
      this.getFusionHelper().getActiveLanguage(
        this.localStorage.APP_LANG as string,
      ),
    );
    this.getTranslation()
      .onLangChange.pipe(untilDestroyed(this))
      .subscribe((lang) => {
        this.currentLanguage.set(lang?.lang);
      });
  }
}
