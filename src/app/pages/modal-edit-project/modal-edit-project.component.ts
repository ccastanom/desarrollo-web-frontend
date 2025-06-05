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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-edit-project',
  standalone: true,
  templateUrl: './modal-edit-project.component.html',
  styleUrls: ['./modal-edit-project.component.scss'],
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
  users: any[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<ModalEditProjectComponent>,
    private readonly projectsService: ProjectsService,
    private readonly usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any  // Aquí viene el proyecto a editar
  ) {}

  ngOnInit(): void {
    const proyecto = this.data?.project || {}; //  Extrae el objeto correctamente

    this.formProject = this.fb.group({
      nombre: [this.data?.nombre || '', Validators.required],
      descripcion: [this.data?.descripcion || ''],
      administrador_id: [this.data?.administrador_id || null, Validators.required]
    });

    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res.users || [];
      },
      error: () => {
        Swal.fire('Error', 'No se pudieron cargar los usuarios', 'error');
      }
    });
  }

  onSubmit(): void {
    if (this.formProject.invalid) return;

    const updatedData = {
      ...this.formProject.value,
      id: this.data.id
    };

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

  onCancel(): void {
    this.dialogRef.close(false);
  }
}