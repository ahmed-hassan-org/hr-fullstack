import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import { RippleModule } from 'primeng/ripple';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppConfigModule } from './config/config.module';
import { AppSidebarComponent } from './app.sidebar.component';
import { SharedWapelModule } from '@wapelSharedLib/shared/SharedWapel.module';
import { WapelBreadcrumbComponent } from '@wapelSharedLib/shared/UI-Components/breadcrumb/breadcrumb.component';
import { RtlDirective } from '@wapelSharedLib/shared/directives/rtl.directive';
import { HeaderNotificationComponent } from './header-notification/header-notification.component';
import { HeaderWidgetComponent } from './header-widget/header-widget.component';
import { AppLayoutComponent } from './app.layout.component';
import { HrMainTopBarComponent } from './hr.topbar.component';
import { AuthMainLayoutComponent } from './module-layouts/auth-main-layout/auth-main-layout.component';
import { CompanyProfileSidebarComponent } from './company-profile-sidebar/company-profile-sidebar.component';
import { CompanyLayoutComponent } from './module-layouts/company-profile-layout/company.layout.component';
import { HrMainLayoutDirective } from '@hrShared/directives/hr-main-layout.directive';
@NgModule({
  declarations: [
    AppMenuitemComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppMenuComponent,
    AppSidebarComponent,
    AppLayoutComponent,
    HrMainTopBarComponent,
    AuthMainLayoutComponent,
    CompanyProfileSidebarComponent,
    CompanyLayoutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SidebarModule,
    RippleModule,
    RouterModule,
    AppConfigModule,
    SharedWapelModule,
    HeaderNotificationComponent,
    HeaderWidgetComponent,
    HeaderWidgetComponent,
    HeaderNotificationComponent,
    WapelBreadcrumbComponent,
    RtlDirective,
    HrMainLayoutDirective,
  ],
  exports: [AppLayoutComponent, AuthMainLayoutComponent],
})
export class AppLayoutModule {}
