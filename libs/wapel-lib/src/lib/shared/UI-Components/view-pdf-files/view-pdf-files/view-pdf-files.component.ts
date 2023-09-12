import {
  Component,
  Injector,
  OnInit,
  TemplateRef
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WapelBase } from '@wapelSharedLib/core/models/classes/WapelBase';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'wapel-erp-view-pdf-files',
  templateUrl: './view-pdf-files.component.html',
  styleUrls: ['./view-pdf-files.component.scss'],
})
@UntilDestroy({ checkProperties: true })
export class ViewPdfFilesComponent extends WapelBase implements OnInit {
  currentLanguage = ''
  /** translation object path */
  messagePrefix = '';
  /** footer template if needed */
  footerActionTemp!: TemplateRef<any>;
  /** footer template if needed */
  headerActionTemp!: TemplateRef<any>;
  /** local storage key for this module */
  localStorageLangKey: any;
  /** pdf file url from parent */
  pdfFileUrl!: any;
  /** function to close dialog passed from parent */

  constructor(
    injector: Injector,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
    super(injector);
    this.messageTranslationPrefix = '';
  }

  ngOnInit(): void {
    this.pdfFileUrl = this.config.data.pdfFileUrl;
    this.messagePrefix = this.config.data.messagePrefix;
    this.footerActionTemp = this.config.data.footerActionTemp;
    this.headerActionTemp = this.config.data.headerActionTemp;
    this.localStorageLangKey = this.config.data.localStorageLangKey;
    this.getAppLanguage();
  }

  getAppLanguage(): void {
    this.currentLanguage = this.getFusionHelper().getActiveLanguage(
      this.localStorageLangKey
    );
    this.getTranslation()
      .onDefaultLangChange.pipe(untilDestroyed(this))
      .subscribe((lang) => {
        this.currentLanguage = lang?.lang;
      });
  }

  closeDialog() {
    this.ref.close();
  }
}
