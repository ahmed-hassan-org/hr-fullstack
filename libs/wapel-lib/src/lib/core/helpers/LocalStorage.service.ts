import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(
    @Inject(DOCUMENT) private document: Document // @Inject('Window') private window: Window
  ) {}

  /** get local storge service data by key */
  getLocal(key: string): any {
    // const uaqKey = 'uaq-' + key;
    const data = window.localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  /** save data in localstorage by key and value */
  setLocal(key: string, value: any): void {
    // const uaqKey = 'uaq-' + key;
    const data = value === undefined ? '' : JSON.stringify(value);
    window.localStorage.setItem(key, data);
  }

  /** save data to session storage */
  setSessionStorage(key: string, value: any) {
    const data = value === undefined ? '' : JSON.stringify(value);
    window.sessionStorage.setItem(key, data);
  }
  /** get data from session storage */
  getSessionStorage(key: string) {
    let data = window.sessionStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  /** remove key from session storage by key  */
  removeSession(key: string): void {
    // const uaqKey = 'uaq-' + key;
    window.sessionStorage.removeItem(key);
  }
  /** remove key from localstorage by key  */
  removeLocal(key: string): void {
    // const uaqKey = 'uaq-' + key;
    window.localStorage.removeItem(key);
  }

  /* Remove All Locals Except User Lang */
  removeAllLocals(languageKey:string): void {
    for (const key in window.localStorage) {
      if (
        window.localStorage.hasOwnProperty(key) &&
        key !== languageKey
      ) {
        window.localStorage.removeItem(key);
      }
    }
  }
}
