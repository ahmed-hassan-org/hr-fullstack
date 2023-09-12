import { Component, Injector, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedWapelModule } from '@wapelSharedLib/shared/SharedWapel.module';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgxSpinnerService } from 'ngx-spinner';
import { WapelBase } from '@wapelSharedLib/core/models/classes/WapelBase';
import { LocalStorageKeys } from '@hrCore/models/enum/LocalStorageKeys.enum';

@Component({
  selector: 'hr-notification',
  standalone: true,
  imports: [CommonModule, SharedWapelModule],
  templateUrl: './header-notification.component.html',
  styleUrls: ['./header-notification.component.scss'],
  providers: [NgxSpinnerService],
})
@UntilDestroy({ checkProperties: true })
export class HeaderNotificationComponent extends WapelBase implements OnInit {
  override currentLanguage = signal('');
  constructor(injector: Injector) {
    super(injector);
    this.messageTranslationPrefix = '';
  }

  ngOnInit(): void {
    this.getAppLanguage();
    this.getSpinnerService().show('header-notification-spinner');
    setTimeout(() => {
      this.getSpinnerService().hide('header-notification-spinner');
    }, 5000);
  }

  override getAppLanguage(): void {
    this.currentLanguage.set(
      this.getFusionHelper().getActiveLanguage(LocalStorageKeys.APP_LANG),
    );
    this.getTranslation()
      .onLangChange.pipe(untilDestroyed(this))
      .subscribe((lang) => {
        this.currentLanguage.set(lang?.lang);
      });
  }
}
