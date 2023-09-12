import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Injector,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WapelBase } from '@wapelSharedLib/core/models/classes/WapelBase';
import { LocalStorageKeysModel } from '@wapelSharedLib/core/models/interfaace/LocalStorageKeysModel.interface';
import { WapelInjectToken } from '@wapelSharedLib/core/token/WapelInjectToken.enum';
import { SharedWapelModule } from '@wapelSharedLib/shared/SharedWapel.module';
import { Observable, Subject, timer } from 'rxjs';
import { repeatWhen, scan, takeWhile } from 'rxjs/operators';

@Component({
  standalone: true,
  imports: [CommonModule, SharedWapelModule],
  selector: 'wapel-erp-otp-counter',
  templateUrl: './otp-counter.component.html',
  styleUrls: ['./otp-counter.component.scss'],
})
@UntilDestroy({ checkProperties: true })
export class OtpCounterComponent extends WapelBase implements OnInit {
  @Input() resetAfterTime = 2;
  @Input() offerId = null;
  @Input() iqamaNumber = null;
  @Input() mobileNumber = null;
  @Input() email = null;
  @Output() resendCounter = new EventEmitter<any>(true);
  /** calling step on of this values:
   * 'ACCOUNT-MOBILE-STEP' | 'REVIEW-APP-STEP'
   */
  @Input() callingStep:
    | 'ACCOUNT-MOBILE-STEP'
    | 'REVIEW-APP-STEP'
    | 'APP-SIGN-CONTRACT-STEP' = 'ACCOUNT-MOBILE-STEP';
  rxjsTimer = timer(1000, 1000);
  reset$ = new Subject();
  sub!: Observable<number>;
  /** counter to count the times of reset, valid must be 3 times only */
  otpResetCount = 0;
  override currentLanguage = signal('');
  constructor(
    injector: Injector,
    @Inject(WapelInjectToken.APP_LOCAL_STORAGE_KEYS)
    public localStorage: LocalStorageKeysModel,
  ) {
    super(injector);
    this.messageTranslationPrefix = 'PAGES.CUSTOMER-LEASING-PAGE.MESSAGES.';
  }

  ngOnInit() {
    this.getAppLanguage();
    //this.refreshTimer();
    this.initialize();
    this.sub.subscribe((val) => (this.resetAfterTime = val));
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

  initialize(): void {
    this.sub = timer(0, 1000).pipe(
      scan((acc) => --acc, this.resetAfterTime * 60),
      takeWhile((x) => x >= 0),
      repeatWhen(() => this.reset$),
    );
  }

  refreshTimer(): void {
    this.reset$.next({});
  }
}
