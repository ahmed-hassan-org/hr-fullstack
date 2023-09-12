import { TemplateRef } from '@angular/core';

export interface ILayoutConfigOptions {
  showLogoSide: boolean;
}

export interface ICrudSidebarConfig {
  showSidebar?: boolean;
  template?: TemplateRef<any> | null;
  onCloseFn?: () => any;
  fullScreen?: boolean;
  /** pass data as object to the spicifed component */
  data?: any;
  title?: string;
  subtitle?: string;
}
