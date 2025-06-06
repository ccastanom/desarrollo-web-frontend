import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from 'app/services/projects/projects.service';
import { UsersService } from 'app/services/users/users.service';
import { AuthService } from '@core/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projects-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule
  ],
  templateUrl: './projects-detail.component.html',
  styleUrls: ['./projects-detail.component.scss']
})
export class ProjectsDetailComponent implements OnInit {
  project: any = null; // Proyecto actual
  assignedUsers: any[] = []; // Lista de usuarios asignados al proyecto
  allUsers: any[] = []; // Todos los usuarios (solo visible para admin)
  selectedUserId!: number; // ID del usuario que se va a asignar
  isLoading = false; // Indicador de carga para la lista de usuarios
  isAdmin: boolean = false; // Si el usuario actual es admin
  displayedColumns: string[] = []; // Columnas visibles en la tabla

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly projectService: ProjectsService,
    private readonly userService: UsersService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    const projectId = Number(this.route.snapshot.paramMap.get('id')); // ID del proyecto por URL
    
    const roleInfo = this.authService.getRoleInfoByToken();  // Rol del usuario actual
    this.isAdmin = roleInfo?.roleId === 1;

    this.setDisplayedColumns(); // ✅ Determina qué columnas se muestran en la tabla

    if (projectId) {
      this.loadProject(projectId); // Carga la información del proyecto
      this.loadAssignedUsers(projectId); // Carga los usuarios asignados
      if (this.isAdmin) this.loadAllUsers(); // Si es admin, carga todos los usuarios disponibles
    }
  }

  //Definir columnas según el rol
  setDisplayedColumns(): void {
    this.displayedColumns = ['id', 'nombre'];
    if (this.isAdmin) {
      this.displayedColumns.push('acciones'); // Solo admins ven el botón de desasignar
    }
  }

  //Carga de datos del proyecto
  loadProject(id: number): void {
    this.projectService.getProjectById(id).subscribe({
      next: (res) => {
        this.project = res.project;
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar el proyecto', 'error');
      }
    });
  }

  //Carga usuarios asignados al proyecto
  loadAssignedUsers(projectId: number): void {
    this.isLoading = true;
    this.projectService.getProjectById(projectId).subscribe({
      next: (res) => {
        this.assignedUsers = res.project.usuarios || [];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  //Carga todos los usuarios (solo para admin)
  loadAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.allUsers = res.users || [];
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar la lista de usuarios', 'error');
      }
    });
  }

  // Asignar usuario al proyecto
  assignUser(): void {
    if (!this.selectedUserId || !this.project?.id) return;

    const data = {
      proyecto_id: this.project.id,
      usuario_id: this.selectedUserId
    };

    this.projectService.assignUserToProject(data).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Usuario asignado correctamente', 'success');
        this.loadAssignedUsers(this.project.id);
        this.selectedUserId = 0;
      },
      error: (err) => {
        Swal.fire('Error', err?.error?.message || 'No se pudo asignar el usuario', 'error');
      }
    });
  }

  //Desasignar usuario
  unassignUser(userId: number): void {
    if (!this.project?.id || !userId) return;

    const data = {
      proyecto_id: this.project.id,
      usuario_id: userId
    };

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción desasignará el usuario del proyecto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, desasignar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectService.unassignUserFromProject(data).subscribe({
          next: () => {
            Swal.fire('Listo', 'Usuario desasignado', 'success');
            this.loadAssignedUsers(this.project.id);
          },
          error: () => {
            Swal.fire('Error', 'No se pudo desasignar el usuario', 'error');
          }
        });
      }
    });
  }

  //Volver al listado de proyectos
  goBack(): void {
    this.router.navigate(['/page/projects']);
  }
}

