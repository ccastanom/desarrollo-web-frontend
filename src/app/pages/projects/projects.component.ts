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
  standalone: true,
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
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['name', 'description', 'date', 'administrator', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filterValues = {
    nombre: '',
    descripcion: '',
  };

  constructor(
    private projectsService: ProjectsService,
    private router: Router,
    private dialog: MatDialog
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

  loadProjects(): void {
    this.projectsService.getProjects(this.filterValues).subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res.projects);
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        console.error('Error al cargar proyectos', err);
      },
    });
  }

  applyFilter(): void {
    this.loadProjects();
  }

  clearFilters(): void {
    this.filterValues = { nombre: '', descripcion: '' };
    this.loadProjects();
  }

  goToDetail(projectId: number): void {
    this.router.navigate(['/page/project', projectId]);
  }

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

  openCreateProjectModal(): void {
    const dialogRef = this.dialog.open(ModalCreateProjectComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((wasCreated: boolean) => {
      if (wasCreated) {
        this.clearFilters();
      }
    });
  }

  openEditProjectModal(project: any): void {
    const dialogRef = this.dialog.open(ModalEditProjectComponent, {
      width: '600px',
      data: project,
    });

    dialogRef.afterClosed().subscribe((wasUpdated: boolean) => {
      if (wasUpdated) {
        this.loadProjects();
      }
    });
  }

  trackByFn(index: number, item: any): number {
    return index;
  }
}

