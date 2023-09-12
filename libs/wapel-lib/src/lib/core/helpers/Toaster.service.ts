import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/** @description all alert and toaster method */
export class ToasterService {
  currentLanguage = '';
  translationSubscription: Subscription | undefined;
  localstorageService: any;

  /** all alert and toaster method */
  constructor(
    private messageService: MessageService,
  ) {}

  /** show success toaster */
  showToastSuccess(
    title:string,
    textContent: string,
    closable = true,
    timer = 2500,
    toasterKey = 'mainToast'
  ) {
    this.closeToaster();

    this.messageService.add({
      severity: 'success',
      summary: title,
      detail: textContent,
      life: timer,
      key: toasterKey,
      closable: closable,
    });
  }

  /** toaster to show error message alert */
  showToastError(
    title:string,
    textContent: string,
    closable = true,
    timer = 2500,
    toasterKey = 'mainToast'
  ) {
    this.closeToaster();

    this.messageService.add({
      severity: 'error',
      summary: title,
      detail: textContent,
      life: timer,
      key: toasterKey,
      closable: closable,
    });
  }

  /** toaster to show warning message alert */
  showToastWarn(
    title: string,
    textContent: string,
    closable = true,
    timer = 2500,
    toasterKey = 'mainToast'
  ) {
    this.closeToaster();

    this.messageService.add({
      severity: 'warn',
      summary: title,
      detail: textContent,
      closable: closable,
      life: timer,
      key: toasterKey,
    });
  }

  /** toaster to show info message alert */
  showToastInfo(
    title: string,
    textContent: string,
    closable = true,
    timer = 2500,
    toasterKey = 'mainToast'
  ) {
    this.closeToaster();
    this.messageService.add({
      severity: 'info',
      summary: title,
      detail: textContent,
      life: timer,
      key: toasterKey,
      closable: closable,
    });
  }

  /** close toaster by name or use default name
   * @param toasterKey @type string @default `mainToast`
   */
  closeToaster(toasterKey = 'mainToast') {
    this.messageService.clear(toasterKey);
  }
}
