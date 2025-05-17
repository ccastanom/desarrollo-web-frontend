import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { AuthGuard } from '@core/guard/auth.guard';

// Definición de las rutas principales de la aplicación
export const APP_ROUTE: Routes = [
  {
    // Ruta raíz protegida por AuthGuard (requiere autenticación)
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        // Carga el módulo de dashboard de forma perezosa (lazy loading)
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTE),
      },
      {
         // Carga el módulo de páginas (como usuarios y proyectos) también con lazy loading
        path: 'page',
        loadChildren: () =>
          import('./pages/page.routes').then(
            (m) =>m.PAGES_ROUTE
          ),
      },
    ],
  },
  {
    // Ruta para autenticación (login, registro, etc.), no requiere estar logueado
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/auth.routes').then((m) => m.AUTH_ROUTE),
  },
];
