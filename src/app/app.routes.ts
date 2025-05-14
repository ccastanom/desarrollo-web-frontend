import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { AuthGuard } from '@core/guard/auth.guard';

export const APP_ROUTE: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTE),
      },
      {
        path: 'page',
        loadChildren: () =>
          import('./pages/page.routes').then(
            (m) =>m.PAGES_ROUTE
          ),
      },
    ],
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/auth.routes').then((m) => m.AUTH_ROUTE),
  },
];
