import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NavigationPaths } from './core/routes/NavigationPaths.enum';
import { NotfoundComponent } from './pages/ErrorPages/notfound/notfound.component';
import { AuthMainLayoutComponent } from './layout/module-layouts/auth-main-layout/auth-main-layout.component';
import { CompanyLayoutComponent } from './layout/module-layouts/company-profile-layout/company.layout.component';
import { canMatchGuard } from '@hrCore/security/can-match.guard';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          redirectTo: `${NavigationPaths.NAVIGATE_TO_AUTH}`,
          pathMatch: 'full',
        },
        {
          path: NavigationPaths.NAVIGATE_TO_AUTH,
          component: AuthMainLayoutComponent,
          loadChildren: () =>
            import('./pages/hr-auth/auth.module').then((m) => m.AuthModule),
        },

        {
          path: '',
          component: CompanyLayoutComponent,
          children: [
            {
              path: NavigationPaths.NAVIGATE_TO_DASHBOARD,
              loadChildren: () =>
                import('./pages/dashboard/dashboard.module').then(
                  (m) => m.DashboardModule
                ),
              canMatch: [canMatchGuard],
            },
            {
              path: NavigationPaths.NAVIGATE_TO_HOME,
              loadChildren: () =>
                import('./pages/home/home.module').then((m) => m.HomeModule),
            },
          ],
        },
        { path: 'pages/server-error', component: NotfoundComponent },
        { path: 'pages/notfound', component: NotfoundComponent },
        { path: '**', redirectTo: 'pages/notfound' },
      ],
      {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'reload',
        urlUpdateStrategy: 'eager',
        useHash: true,
        bindToComponentInputs: true,
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
