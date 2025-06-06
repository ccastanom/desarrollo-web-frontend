import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ProjectsService } from 'app/services/projects/projects.service';
import { UsersService } from 'app/services/users/users.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2'; // Librería para mostrar alertas amigables

@Component({
  selector: 'app-modal-edit-project',
  standalone: true, // El componente es independiente, no requiere estar declarado en un módulo
  templateUrl: './modal-edit-project.component.html', // Archivo HTML del componente
  styleUrls: ['./modal-edit-project.component.scss'], // Estilos asociados al componente
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
export class ModalEditProjectComponent implements OnInit {
  formProject!: FormGroup;
  users: any[] = []; // Lista de usuarios disponibles (para el selector de administrador)

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<ModalEditProjectComponent>,
    private readonly projectsService: ProjectsService, // Servicio para operaciones con proyectos
    private readonly usersService: UsersService, // Servicio para obtener usuarios
    @Inject(MAT_DIALOG_DATA) public data: any  // Aquí viene el proyecto a editar
  ) {}

  ngOnInit(): void {
    const proyecto = this.data?.project || {}; //  Extrae el objeto correctamente

    this.formProject = this.fb.group({
      nombre: [this.data?.nombre || '', Validators.required],
      descripcion: [this.data?.descripcion || ''],
      administrador_id: [this.data?.administrador_id || null, Validators.required]
    });
    // Carga la lista de usuarios para mostrar en el select
    this.loadUsers();
  }
  // Obtiene todos los usuarios del sistema (puedes filtrar luego si necesitas solo administradores)
  loadUsers(): void {
    this.usersService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res.users || [];
      },
      error: () => {
        Swal.fire('Error', 'No se pudieron cargar los usuarios', 'error'); // Muestra alerta si falla
      }
    });
  }

  // Envía el formulario al backend si es válido
  onSubmit(): void {
    if (this.formProject.invalid) return; // Si el formulario no es válido, no hace nada

    // Prepara los datos actualizados, incluyendo el id del proyecto
    const updatedData = {
      ...this.formProject.value,
      id: this.data.id
    };

    // Llama al servicio para actualizar el proyecto
    this.projectsService.updateProject(updatedData).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Proyecto actualizado correctamente', 'success');
        this.dialogRef.close(true);
      },
      error: () => {
        Swal.fire('Error', 'No se pudo actualizar el proyecto', 'error');
      }
    });
  }

  // Cierra el modal sin guardar cambios
  onCancel(): void {
    this.dialogRef.close(false);
  }
}