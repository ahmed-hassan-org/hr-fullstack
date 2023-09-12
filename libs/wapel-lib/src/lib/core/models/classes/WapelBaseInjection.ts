import { Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '@wapelSharedLib/core/helpers/LocalStorage.service';
import { ToasterService } from '@wapelSharedLib/core/helpers/Toaster.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService } from 'primeng/api';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { WapelHelperService } from '@wapelSharedLib/core/helpers/WapelHelper.service';

export function getTranslation(): TranslateService {
  return Inject(TranslateService);
}

export function getRouter(): Router {
  return Inject(Router);
}

export function getActivatedRoute(): ActivatedRoute {
  return Inject(ActivatedRoute);
}

export function getToaster(): ToasterService {
  return Inject(ToasterService);
}

export function getLocalStorageService(): LocalStorageService {
  return Inject(LocalStorageService);
}

export function getHelperService(): WapelHelperService {
  return Inject(WapelHelperService);
}

export function getSpinnerService(): NgxSpinnerService {
  return Inject(NgxSpinnerService);
}

export function getPermissionService(): NgxPermissionsService {
  return Inject(NgxPermissionsService);
}

export function getConfirmationService(): ConfirmationService {
  return Inject(ConfirmationService);
}

export function getDocument(): Document {
  return Inject(DOCUMENT);
}

export function getViewScroll(): ViewportScroller {
  return Inject(ViewportScroller);
}

export function getFormBuilder(): FormBuilder {
  return Inject(FormBuilder);
}
