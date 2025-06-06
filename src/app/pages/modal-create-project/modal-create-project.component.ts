// Importaciones necesarias desde Angular, Material y servicios personalizados
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

// Decorador que define el componente
@Component({
  selector: 'app-modal-create-project', // Nombre del componente
  templateUrl: './modal-create-project.component.html', // Archivo HTML asociado
  styleUrls: ['./modal-create-project.component.scss'], // Estilos del componente
  standalone: true, // Permite que este componente no dependa de un módulo Angular tradicional
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
  users: any[] = []; // Lista de administradores disponibles

  constructor(
    private readonly authService: AuthService, // Servicio de autenticación
    private readonly projectsService: ProjectsService, // Servicio de proyectos
    private readonly router: Router, // Navegación (no usado en este archivo)
    private readonly fb: FormBuilder, // Utilidad para construir el formulario
    private readonly dialogRef: MatDialogRef<ModalCreateProjectComponent>, // Referencia al modal (para cerrarlo)
    private readonly usersService: UsersService, // Servicio de usuarios
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Inicialización del formulario con campos requeridos
    this.formProject = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      administrador_id: [null, Validators.required], 
    });
  }

  ngOnInit(): void {
    this.loadUsers();// Carga la lista de administradores

    // Obtiene el usuario autenticado desde el token y lo asigna como administrador por defecto
    const currentUser = this.authService.getRoleInfoByToken();
    if (currentUser) {
      this.formProject.patchValue({ administrador_id: currentUser.id });
    }
  }

  // Método para obtener todos los administradores del sistema
  loadUsers(): void {
    this.usersService.getAllAdministrator().subscribe({
      next: (res) => {
        this.users = res.users || []; // Asigna la lista de usuarios si existe
      },
      error: () => {
        Swal.fire('Error', 'No se pudieron cargar los usuarios', 'error');
      },
    });
  }

  // Acción al hacer clic en "Crear"
  onSubmit(): void {
    if (this.formProject.invalid) return; // Valida el formulario antes de continuar

    const formData = this.formProject.value; // Extrae los datos del formulario

    this.projectsService.createProject(formData).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Proyecto creado correctamente', 'success');
        this.dialogRef.close(true); // Cierra el modal y envía true como confirmación
      },
      error: (error) => {
        console.error(error); // Log del error en consola
        Swal.fire('Error', 'No se pudo crear el proyecto', 'error');
      },
    });
  }
  // Acción al hacer clic en "Cancelar"
  onCancel(): void {
    this.dialogRef.close(false); // Cierra el modal sin guardar cambios
  }
}

