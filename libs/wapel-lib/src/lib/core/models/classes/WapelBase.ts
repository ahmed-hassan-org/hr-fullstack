import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Injector, signal } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { NgxSpinnerService } from 'ngx-spinner';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { amiriFont } from './fonts/AmiriFontRegular';
import { LocalStorageService } from '@wapelSharedLib/core/helpers/LocalStorage.service';
import { ToasterService } from '@wapelSharedLib/core/helpers/Toaster.service';
import { WapelHelperService } from '@wapelSharedLib/core/helpers/WapelHelper.service';

/**
 * @description base class for project to hold all repeated injection and operation
 */
export abstract class WapelBase {
  /** default value for dropdowns */
  protected readonly dropdownDefaultValue = Object.freeze({
    id: '',
    arabicName: 'إختر من القائمة',
    name: 'Select from list',
  });
  /** other value for dropdowns */
  protected readonly dropdownOtherValue = Object.freeze({
    id: 0,
    arabicName: 'أخري',
    text: 'Other with notes',
  });
  /** start on page */
  pageNumber = signal(1);
  /** default page size from server side */
  pageSize = signal(10);
  /** select rows per page */
  rowsPerPage = [10, 20, 30, 40, 50];

  calendarYearRange = `1930:${new Date().getFullYear()}`;
  /** current active language in app */
  currentLanguage = signal('');
  /** row total count */
  rowTotalCount = signal(0);
  private EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  /** the current active language by system */
  // protected currentActivelanguage: string = '';
  /** common validation messages path, it's the  */
  readonly commonValidationMessages: string = 'VALIDATION-MESSAGES.';
  /** general message translation prefix */
  public readonly commonMessages: string = 'COMMON-MESSAGES.';
  /** message translation path for current componet that extends the class */
  public messageTranslationPrefix = '';
  /** validation translation path for current componet that extends the class */
  public validationTranslationPrefix = '';
  /** tooltip & popover path */
  public tooltipTranslationPrefix = '';
  /** @description current loggin status for logged in user
   * @type `boolean`
   * @default false */
  // public isLoggedIn: boolean = false;

  // protected readonly userRoles: AdminUserRoles;

  private readonly router: Router;
  private readonly document!: Document;
  private readonly activatedRoute!: ActivatedRoute;
  protected readonly translation!: TranslateService;
  protected readonly localStorageService!: LocalStorageService;
  protected readonly toasterService!: ToasterService;
  protected readonly AppHelperService!: WapelHelperService;
  protected readonly confirmationService!: ConfirmationService;
  // protected readonly authService!: AuthService;
  protected readonly permissionService!: NgxPermissionsService;
  protected readonly rolesService!: NgxRolesService;
  protected readonly formBuilder!: UntypedFormBuilder;
  protected readonly viewScroll!: ViewportScroller;
  protected readonly spinnerService!: NgxSpinnerService;
  constructor(injector: Injector) {
    this.router = injector.get(Router);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.translation = injector.get(TranslateService);
    this.localStorageService = injector.get(LocalStorageService);
    this.toasterService = injector.get(ToasterService);
    this.AppHelperService = injector.get(WapelHelperService);
    this.confirmationService = injector.get(ConfirmationService);
    this.formBuilder = injector.get(UntypedFormBuilder);
    this.document = injector.get(DOCUMENT);
    // this.authService = injector.get(AuthService);
    this.permissionService = injector.get(NgxPermissionsService);
    this.rolesService = injector.get(NgxRolesService);
    this.viewScroll = injector.get(ViewportScroller);
    this.spinnerService = injector.get(NgxSpinnerService);
  }

  /** return router */
  get getRouter() {
    return this.router;
  }

  /** view scroll service */
  getViewScroll() {
    return this.viewScroll;
  }

  /** spinner service  */
  getSpinnerService() {
    return this.spinnerService;
  }

  /** used to work with `dom` and catch dom element and edit on them*/
  getDocument() {
    return this.document;
  }

  /** current  activated route */
  get getActivatedRoute() {
    return this.activatedRoute;
  }

  /** translation service instance */
  getTranslation() {
    return this.translation;
  }

  /** get data from storage `localstorgae` or `session storage` */
  getLocalStorage() {
    return this.localStorageService;
  }

  /** used to show toaster */
  getAlertToaster() {
    return this.toasterService;
  }
  /** used to interact with helper methods */
  getFusionHelper() {
    return this.AppHelperService;
  }

  /** authentecation service hold all auth operation sucha s login, register, get roles , decode JWT etc... */
  // getAuthService() {
  //   return this.authService;
  // }

  /** permission service */
  getpermissionService() {
    return this.permissionService;
  }
  /** get current user roles */
  getRolesService() {
    return this.rolesService;
  }

  /** show prime ng confirm dialog */
  getConfirmationService() {
    return this.confirmationService;
  }

  /** use form builder */
  get getFormBuilder() {
    return this.formBuilder;
  }

  /** used to save file to used machine */
  saveFileAs(blobFile: string | Blob, fileName: string) {
    saveAs(blobFile, fileName);
  }

  /**
   *get current app language from local storage
    copy this code and put it in the method body for every extend

    `this.currentLanguage.set(
      this.getFusionHelper().getActiveLanguage(LocalStorageKeys.APP_LANG),
    );
    this.getTranslation()
      .onDefaultLangChange.pipe(untilDestroyed(this))
      .subscribe((lang) => {
        this.currentLanguage.set(lang?.lang);
      });`
  */
  getAppLanguage(): void {
    console.log('app lang');
  }

  /** export all table data to pdf */
  protected exportDataTableToPdf(
    headerColumn: any[],
    tableData: any[],
    pdfTitle: string,
    fileName: string
  ) {
    const pdf = new jsPDF();

    const tableHeader = headerColumn.map((ele) =>
      ele.isVisible ? ele.columnName : ''
    );

    const allData = tableData.map((ele) => Object.values(ele));

    pdf.addFileToVFS('Amiri-Regular.ttf', amiriFont);
    pdf.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
    pdf.setFont('Amiri');
    const xOffset =
      pdf.internal.pageSize.width / 2 -
      (pdf.getStringUnitWidth(pdfTitle) * pdf.internal.pageSize.getWidth()) / 2;
    pdf.text(pdfTitle, xOffset, 250, { align: 'center' });

    pdf.setFontSize(12);

    (pdf as any).autoTable({
      head: [tableHeader],
      body: allData,
      theme: 'grid',
      styles: {
        font: 'Amiri',
        halign: 'center',
      },
    });
    // Open PDF document in browser's new tab
    pdf.output('dataurlnewwindow');

    // Download PDF doc
    pdf.save(`${fileName}.pdf`);
  }
  /** export all table data to excel */
  protected exportDataTableToExcel(tabledata: any[], fileName: string) {
    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(tabledata);
    const myworkbook: XLSX.WorkBook = {
      Sheets: { data: myworksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(myworkbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, fileName, 'xlsx');
  }

  /** export all table data to csv */
  protected exportDataTableToCsv(tabledata: any[], fileName: string) {
    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(tabledata);
    const myworkbook: XLSX.WorkBook = {
      Sheets: { data: myworksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(myworkbook, {
      bookType: 'csv',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, fileName, 'csv');
  }

  private saveAsExcelFile(
    buffer: any,
    fileName: string,
    fileType: 'xlsx' | 'csv' = 'xlsx'
  ): void {
    const data: Blob = new Blob([buffer], {
      type: 'xlsx',
    });
    saveAs(data, fileName + '_exported.' + fileType);
  }

  /** check any level of form group if it has error or not */
  isFormControlHasError(
    formInstance: UntypedFormGroup,
    controlName: string,
    errorName: string
  ) {
    return formInstance.get(controlName)?.hasError(errorName);
  }

  /** check is form control state changes  */
  checkFormControlState(formInstance: UntypedFormGroup, controlName: string) {
    return (
      formInstance.get(controlName)?.invalid &&
      (formInstance.get(controlName)?.touched ||
        formInstance.get(controlName)?.dirty)
    );
  }

  Locz(key: string, paramObj?: any) {
    return this.getTranslation().instant(key, { ...paramObj });
  }

  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  GetOperators(oper: any) {
    switch (oper) {
      case '=':
        oper = 'equal';
        break;
      case '!=':
        oper = 'not_equal';
        break;
      case '>':
        oper = 'greater';
        break;
      case '>=':
        oper = 'greater_or_equal';
        break;
      case '<':
        oper = 'less';
        break;
      case '<=':
        oper = 'less_or_equal';
        break;
      case 'like':
        oper = 'contains';
        break;
      case 'not in':
        oper = 'not_in';
        break;
      default:
        break;
    }
    return oper;
  }

  /**
   * @description get screen permission
   * */
  // async getScreenPermissionOnStart(checkRoleName?: string) {
  //   // clean permission service
  //   this.getpermissionService().flushPermissions();
  //   const screenName = this.getActivatedRoute().snapshot.data['screenName'];
  //   const data = await this.getMenuService.getModuleScreenPermission;

  //   if (data && data.screenRoles) {
  //     let perm: string[] = data.screenRoles[0][screenName];
  //     this.getpermissionService().addPermission(perm);
  //   }
  // }

  // /** repopulate screen with permission after close current screen */
  // async repopulatePermissionRoles() {
  //   const rolesPerm: any = this.getLocalStorage().getSessionStorage(
  //     LocalStorageKeys.APP_TREE
  //   );
  //   if (rolesPerm) {
  //     const moduleSbmoduleList: any = rolesPerm.modulesSubmodule;
  //     const screensList: any = rolesPerm.screens;
  //     this.getpermissionService().flushPermissions();
  //     this.getMenuService.setModuleScreenPermission(rolesPerm);
  //     // must add this line of code by take the screen from the response
  //     this.getpermissionService().addPermission([...moduleSbmoduleList, ...screensList]);
  //   }
  // }

  translateHeaderMenuItems = (childeren: MenuItem[], returnInto: any) => {
    for (const item of childeren) {
      if (item.separator) continue;
      item.label = this.getTranslation().instant(
        `${this.messageTranslationPrefix}${item.id}`
      );
      if (item.items) {
        this.translateHeaderMenuItems(item.items, returnInto);
      }
    }
    returnInto.set([...childeren]);
    this.getTranslation().onLangChange.subscribe((data) => {
      for (const item of childeren) {
        if (item.separator) continue;
        item.label = this.getTranslation().instant(
          `${this.messageTranslationPrefix}${item.id}`
        );
        if (item.items) {
          this.translateHeaderMenuItems(item.items, returnInto);
        }
      }
      returnInto.set([...childeren]);
    });
  };
}
