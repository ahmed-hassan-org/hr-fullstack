import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  Injector,
  Input,
  OnInit,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WapelBase } from '@wapelSharedLib/core/models/classes/WapelBase';
import { LocalStorageKeysModel } from '@wapelSharedLib/core/models/interfaace/LocalStorageKeysModel.interface';
import { WapelInjectToken } from '@wapelSharedLib/core/token/WapelInjectToken.enum';
import { SharedWapelModule } from '@wapelSharedLib/shared/SharedWapel.module';

@Component({
  standalone: true,
  selector: 'wapel-erp-error-messages-container',
  templateUrl: './error-messages-container.component.html',
  styleUrls: ['./error-messages-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, SharedWapelModule],
})
@UntilDestroy({ checkProperties: true })
export class ErrorMessagesContainerComponent
  extends WapelBase
  implements OnInit
{
  @Input() validationErrorList: string[] = [];

  override currentLanguage = signal('');

  constructor(
    injector: Injector,
    @Inject(WapelInjectToken.APP_LOCAL_STORAGE_KEYS)
    public localStorage: LocalStorageKeysModel,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.getAppLanguage();
  }

  override getAppLanguage(): void {
    this.currentLanguage.set(
      this.getFusionHelper().getActiveLanguage(
        this.getLocalStorage().getLocal(this.localStorage.APP_LANG as string),
      ),
    );
    this.getTranslation()
      .onLangChange.pipe(untilDestroyed(this))
      .subscribe((lang) => {
        this.currentLanguage.set(lang?.lang);
      });
  }
}
