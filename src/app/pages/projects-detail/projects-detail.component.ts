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
  project: any = null;
  assignedUsers: any[] = [];
  allUsers: any[] = [];
  selectedUserId!: number;
  isLoading = false;
  isAdmin: boolean = false;
  displayedColumns: string[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly projectService: ProjectsService,
    private readonly userService: UsersService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    const projectId = Number(this.route.snapshot.paramMap.get('id'));
    
    const roleInfo = this.authService.getRoleInfoByToken();
    this.isAdmin = roleInfo?.roleId === 1;

    this.setDisplayedColumns(); // ✅ ahora sí existe

    if (projectId) {
      this.loadProject(projectId);
      this.loadAssignedUsers(projectId);
      if (this.isAdmin) this.loadAllUsers();
    }
  }

  setDisplayedColumns(): void {
    this.displayedColumns = ['id', 'nombre'];
    if (this.isAdmin) {
      this.displayedColumns.push('acciones');
    }
  }

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

  goBack(): void {
    this.router.navigate(['/page/projects']);
  }
}

