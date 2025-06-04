import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProjectsService } from 'app/services/projects/projects.service';
import { UsersService } from 'app/services/users/users.service';
import { AuthService } from '@core/service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-create-project',
  templateUrl: './modal-create-project.component.html',
  styleUrls: ['./modal-create-project.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class ModalCreateProjectComponent implements OnInit {
  formProject: FormGroup;
  users: any[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly projectsService: ProjectsService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<ModalCreateProjectComponent>,
    private readonly usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formProject = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      administrador_id: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUsers();

    // Asigna automáticamente el administrador logueado como predeterminado
    const currentUser = this.authService.getRoleInfoByToken();
    if (currentUser) {
      this.formProject.patchValue({ administrador_id: currentUser.id });
    }
  }

  loadUsers(): void {
    this.usersService.getAllAdministrator().subscribe({
      next: (res) => {
        this.users = res.users || [];
      },
      error: () => {
        Swal.fire('Error', 'No se pudieron cargar los usuarios', 'error');
      },
    });
  }

  onSubmit(): void {
    if (this.formProject.invalid) return;

    const formData = this.formProject.value;

    this.projectsService.createProject(formData).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Proyecto creado correctamente', 'success');
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error(error);
        Swal.fire('Error', 'No se pudo crear el proyecto', 'error');
      },
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

