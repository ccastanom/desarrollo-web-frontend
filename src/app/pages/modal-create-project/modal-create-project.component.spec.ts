import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCreateProjectComponent } from './modal-create-project.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsService } from 'app/services/projects/projects.service';
import { UsersService } from 'app/services/users/users.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ModalCreateProjectComponent', () => {
  let component: ModalCreateProjectComponent;
  let fixture: ComponentFixture<ModalCreateProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [ModalCreateProjectComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        ProjectsService,
        UsersService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCreateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('el formulario debe ser inválido por defecto', () => {
    expect(component.formProject.valid).toBeFalse();
  });

  it('debe ser válido cuando todos los campos están completos', () => {
    component.formProject.setValue({
      nombre: 'Proyecto Test',
      descripcion: 'Descripción de prueba',
      administrador_id: 1
    });
    expect(component.formProject.valid).toBeTrue();
  });
});

