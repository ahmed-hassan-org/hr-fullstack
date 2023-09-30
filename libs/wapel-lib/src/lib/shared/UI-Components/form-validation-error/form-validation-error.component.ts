import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  Injector,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { FormArray, FormGroup, UntypedFormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WapelBase } from '@wapelSharedLib/core/models/classes/WapelBase';
import { LocalStorageKeysModel } from '@wapelSharedLib/core/models/interfaace/LocalStorageKeysModel.interface';
import { WapelInjectToken } from '@wapelSharedLib/core/token/WapelInjectToken.enum';
import { SharedWapelModule } from '@wapelSharedLib/shared/SharedWapel.module';
interface LengthValParam {
  default: number;
  minLength: number;
  maxLength: number;
  val1: number;
  val2: number;
  length: number;
}
@Component({
  standalone: true,
  selector: 'wapel-erp-form-validation-error',
  templateUrl: './form-validation-error.component.html',
  styleUrls: ['./form-validation-error.component.scss'],
  imports: [CommonModule, SharedWapelModule],
})
@UntilDestroy({ checkProperties: true })
export class FormValidationErrorComponent extends WapelBase implements OnInit {
  @Input() isArabicMode = false;
  /** list of errors to check on it and return with error name */
  @Input() validationErrorList: string[] = [];
  /** the current used form passed as input */
  @Input() formInstance!: FormGroup | UntypedFormGroup;
  /**form array name to work on it */
  @Input() formArrayInstance!: string;
  /** the form control index */
  @Input() formControlIndex!: number;
  /** the control name that we check error on it */
  @Input() controlName = '';
  @Input() LengthValParam!: LengthValParam;
  @Input() translationPrefix = null;
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
        this.localStorage.APP_LANG as string,
      ),
    );
    this.getTranslation()
      .onLangChange.pipe(untilDestroyed(this))
      .subscribe((lang) => {
        this.currentLanguage.set(lang?.lang);
      });
  }

  getFormArray() {
    return this.formInstance.get(this.formArrayInstance) as FormArray;
  }
}
