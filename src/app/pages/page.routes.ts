import{ Route } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsDetailComponent } from './projects-detail/projects-detail.component';
import { AdminGuard } from '@core/guard/admin.guard';

// Definición de rutas principales para la sección de páginas del sistema
export const PAGES_ROUTE: Route[] = [
    {
        path:'users',
        component: UsersComponent,
        canActivate: [AdminGuard], // Solo accesible para usuarios con rol de administrador
    },
    {
        path: 'projects',
        component: ProjectsComponent, // Página que lista todos los proyectos
    },
    {
        path: 'project/:id',
        component: ProjectsDetailComponent, // Vista de detalle de un proyecto individual, usa el ID como parámetro dinámico
    },
];