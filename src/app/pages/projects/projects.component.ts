import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProjectsService } from 'app/services/projects/projects.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ModalCreateProjectComponent } from '../modal-create-project/modal-create-project.component';
import { ModalEditProjectComponent } from '../modal-edit-project/modal-edit-project.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-projects',
  standalone: true, // Componente standalone (independiente de módulos)
  imports: [
    BreadcrumbComponent,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  templateUrl: './projects.component.html',  // Archivo HTML asociado
  styleUrls: ['./projects.component.scss'],  // Estilos SCSS asociados
})
export class ProjectsComponent {
  dataSource = new MatTableDataSource<any>();    // Fuente de datos para la tabla
  displayedColumns: string[] = ['name', 'description', 'date', 'usuariosAsignados', 'actions']; // Columnas visibles en la tabla
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  filterValues = {
    nombre: '', // Filtro por nombre
    descripcion: '',  // Filtro por descripción
  };

  constructor(
    private projectsService: ProjectsService,  // Servicio para proyectos
    private router: Router,   // Para redireccionar entre rutas
    private dialog: MatDialog  // Servicio para abrir diálogos (modales)
  ) {}

  breadscrums = [
  {
    title: 'Gestión de proyectos',
    items: [],
    active: 'Listado de proyectos',
  },
];

  ngOnInit(): void {
    this.loadProjects();
  }

  // Carga los proyectos desde el backend y asigna el paginador
  loadProjects(): void {
    this.projectsService.getProjects(this.filterValues).subscribe({
      next: (res: any) => {
        console.log('📦 Proyectos recibidos:', res.projects);
        this.dataSource = new MatTableDataSource(res.projects);
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        console.error('Error al cargar proyectos', err);
      },
    });
  }

  // Aplica los filtros al hacer cambios en los inputs
  applyFilter(): void {
    this.loadProjects();
  }

  // Limpia los filtros y recarga todos los proyectos
  clearFilters(): void {
    this.filterValues = { nombre: '', descripcion: '' };
    this.loadProjects();
  }

  // Redirige al detalle del proyecto
  goToDetail(projectId: number): void {
    this.router.navigate(['/page/project', projectId]);
  }

  // Elimina un proyecto tras confirmación del usuario
  deleteProject(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.projectsService.deleteProject(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El proyecto ha sido eliminado.', 'success');
            this.loadProjects();
          },
          error: (err: any) => {
            Swal.fire('Error', 'No se pudo eliminar el proyecto', 'error');
          },
        });
      }
    });
  }

  // Abre el modal para crear un nuevo proyecto
  openCreateProjectModal(): void {
    const dialogRef = this.dialog.open(ModalCreateProjectComponent, {
      width: '600px',
    });

    // Si se creó un proyecto, recarga la lista
    dialogRef.afterClosed().subscribe((wasCreated: boolean) => {
      if (wasCreated) {
        this.clearFilters();
      }
    });
  }

  // Abre el modal para editar un proyecto existente
  openEditProjectModal(project: any): void {
    const dialogRef = this.dialog.open(ModalEditProjectComponent, {
      width: '600px',
      data: project, // Pasa el proyecto a editar como datos al modal
    });

    // Si se actualizó un proyecto, recarga la lista
    dialogRef.afterClosed().subscribe((wasUpdated: boolean) => {
      if (wasUpdated) {
        this.loadProjects();
      }
    });
  }

  // TrackBy para optimizar el renderizado del *ngFor
  trackByFn(index: number, item: any): number {
    return index;
  }
}

