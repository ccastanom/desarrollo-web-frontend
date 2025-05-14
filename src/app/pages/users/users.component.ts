import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsersService } from 'app/services/users/users.service';
import { ModalCreateUsersComponent } from 'app/pages/modal-create-users/modal-create-users.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditUsersComponent } from '@app/pages/modal-edit-users/modal-edit-users.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';

export interface User {
  name:string;
}


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  displayedColumns: string[] = [
    'name',
    'email',
    'role',
    'action'
  ];

  breadscrums = [
    {
      title: 'Gestión de usuarios',
      items: [],
      active: 'Datos básicos',
    },
  ];

  breadscrumsDetails = [
    {
      title: '',
    },
  ];

  //table
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, {static:true}) paginator!: MatPaginator;

  //search
  userFormsSearchFilter!: FormGroup;
  userList: any[] = [];

  isLoading = false;

  userDefaultFilterSearch: any = {
    name: undefined,
    email:undefined,
  }

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly userService: UsersService,
    private readonly dialogModel: MatDialog,
    private readonly _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createUserFormSearchFilter();
    this.getAllUserByAdministrator();
    this.handleUserFilterChange('name', 'name');
    this.handleUserFilterChange('email', 'email');
  }

  private createUserFormSearchFilter(){
    this.userFormsSearchFilter = this._formBuilder.group({
      name: [ ''],
      email: ['']
    })
  }

  getRoleName(rol_id:  number): string {
    switch (rol_id) {
      case 1: 
        return 'Administrador';
      case 2:
        return 'Usuario';
      default:
        return 'Desconocido';
    }
  }

  trackByFn(index: number, item: any): any {
    return item.id; // o simplemente 'item' si no hay ID único
  }


  private handleUserFilterChange(controlName: string, filterkey: string) {
    this.userFormsSearchFilter.controls[controlName].valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((value: any) => {
      this.userDefaultFilterSearch[filterkey]= value;
      console.log(this.userDefaultFilterSearch);
      this.getAllUserByAdministrator({...this.userDefaultFilterSearch, [filterkey]:value });
    });
  }

  getAllUserByAdministrator(filters?: any): void {
    this.isLoading = true;
    this.userService.getAllUserByAdministrator(filters).subscribe({
      next: (response) => {
        const usuarios = response.users || response.user || [];
        this.userList = usuarios;
        this.dataSource.data = usuarios;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  openModalCreateUser(): void {
    const dialogRef = this.dialogModel.open(ModalCreateUsersComponent, {
      minWidth: '300px',
      maxWidth: '1000px',
      width: '840px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllUserByAdministrator();
      }
    })
  }

  openModalUpdateUsers(userInformation: any): void {
    const dialogRef = this.dialogModel.open(ModalEditUsersComponent, {
      minWidth: '300px',
      maxWidth:'1000px',
      width: '840px',
      disableClose: true,
      data: {user: userInformation}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllUserByAdministrator
      }
    });
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe({
      next: (response) => {
        this._snackBar.open(response.message, 'Cerrar', {duration: 5000});
        this.getAllUserByAdministrator();
      },
      error:(error) => {
        const errorMessage = error.error?.message || "Error al liminar el usuario";
        this._snackBar.open(errorMessage, 'Cerrar', {duration:5000});
      }
    });
  }


}




