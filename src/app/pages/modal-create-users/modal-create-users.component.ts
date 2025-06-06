import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'app/services/users/users.service';
import { invalid } from 'moment';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-modal-create-users',
  standalone: true, // Componente independiente (standalone)
  imports: [CommonModule, FormsModule,MatDialogModule,MatButtonModule,MatSelectModule,MatIconModule,MatFormFieldModule,
    MatInputModule,MatDialogActions, MatDialogClose,MatDialogTitle,MatDialogContent,ReactiveFormsModule],
  templateUrl: './modal-create-users.component.html',
  styleUrl: './modal-create-users.component.scss'
})
export class ModalCreateUsersComponent implements OnInit {

  formCreateUser!: FormGroup; // Formulario reactivo para la creación de usuario
  administratorsValues:any[] = []; // Lista de administradores disponibles (para asignar a nuevos usuarios)
  showFieldAdministrator: boolean = false; // Controla si se muestra o no el campo de administrador

  // Constructor con inyecciones de dependencias necesarias
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Datos recibidos por el modal
    private readonly _formBuilder: FormBuilder, // Constructor de formularios
    private readonly _userService: UsersService, // Servicio de usuarios
    private readonly dialogRef: MatDialogRef<ModalCreateUsersComponent>, // Referencia al modal
    private readonly _snackBar: MatSnackBar, // Notificaciones tipo snackbar
  )

  {
    // Inicializa el formulario y configura la validación de contraseña
    this.createFormUsers();
    // Escucha cambios en el campo de confirmación de contraseña, con debounce
    this.formCreateUser.controls['confirmPassword'].valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((value) => {
      this.validatePassword(value); // Valida si las contraseñas coinciden
    });
  }

  // Se ejecuta al inicializar el componente, carga los administradores
ngOnInit(): void {
  this.getAllAdministrator();
}

// Crea los campos del formulario con sus  validaciones
createFormUsers() {
  this.formCreateUser = this._formBuilder.group({
    nombre: ['',Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    rol_id: ['', Validators.required],
    administrador_id: [undefined, Validators.required]
  });
}

// Consulta los administradores desde el backend
getAllAdministrator() {
  this._userService.getAllAdministrator().subscribe({
    next: (res) => {
      this.administratorsValues = res.users; // Almacena la respuesta
      console.log("Administradores cargados:", this.administratorsValues); // Verifica en consola
    },
    error:(err) => {
      console.error("error getAllAdministrator", err); // Muestra error en consola
    }
  });
}

// Controla el cambio de rol y la visibilidad del campo de administrador
onChangeRole(event: any){
  if (event.value === '1') { // Si es administrador, se oculta el campo
    this.hideAdministratorField();
  } else { // Si es usuario, se muestra el campo
    this.showAdministratorField();
  }
}

// Maneja el envío del formulario valida y envía los datos al backend
onSubmit() {
  console.log('Formulario inválido:', this.formCreateUser.value); // revisa esto en consola
  console.log('Estado completo:', this.formCreateUser);
  if (this.formCreateUser.invalid) { // Si el formulario no es válido, se muestra una alerta
    Swal.fire('Error', 'Por favor completa todos los campos', 'error');
    return;
  }

  // Datos que se enviarán al backend
  const userDataInformation = {
    nombre: this.formCreateUser.get('nombre')?.value,
    email: this.formCreateUser.get('email')?.value,
    password: this.formCreateUser.get('password')?.value,
    rol_id: Number(this.formCreateUser.get('rol_id')?.value),
    administrador_id:this.formCreateUser.get('administrador_id')?.value,
  };


  // Envío de los datos al servicio para crear el usuario
  this._userService.createUser(userDataInformation).subscribe ({
    next: (response) => {
      // Éxito: se muestra notificación y se cierra el modal
      this._snackBar.open(response.message, 'Cerrar', {duration: 5000 });
      this.formCreateUser.reset();
      this.dialogRef.close(true);
    },
    error: (error) => {
      // Error: se muestra alerta con el mensaje
      const errorMessage = error.error?.result || 'Ocurrió un error inesperado, Por favor, intenta nuevamente'
      this._snackBar.open(errorMessage, 'Cerrar',{duration: 5000 });
    }
  });
}

// Valida que la confirmación de contraseña coincida
private validatePassword(confirmPassword: string) {//contraseña de confirmacion coincide con la contraseña
  const password = this.formCreateUser.get('password')?.value;
  if (password !== confirmPassword) {
    this.formCreateUser.get('confirmPassword')?.setErrors({invalid: true}); // Error si no coinciden
  } else {
    this.formCreateUser.get('confirmPassword')?.setErrors(null); //Si coincide, no hay error
  }
}

// Muestra el campo de administrador (cuando el rol es "Usuario")
private showAdministratorField() { //Cuando el rol es diferente de 1, se muestra el campo de administrador
  this.showFieldAdministrator = true;
  this.formCreateUser.get('administrador_id')?.setValidators([Validators.required]);
  this.formCreateUser.get('administrador_id')?.updateValueAndValidity();
}

// Oculta el campo de administrador (cuando el rol es "Administrador")
private hideAdministratorField(){ //Cuando el rol es 1, no se muestra el campo de administrador
  this.showFieldAdministrator = false;
  this.formCreateUser.get('administrador_id')?.clearValidators();
  this.formCreateUser.get('administrador_id')?.updateValueAndValidity();
}

}
