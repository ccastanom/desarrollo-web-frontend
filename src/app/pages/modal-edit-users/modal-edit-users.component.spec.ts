import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditUsersComponent } from './modal-edit-users.component';

// Suite de pruebas para el componente ModalEditUsersComponent
describe('ModalEditUsersComponent', () => {
  let component: ModalEditUsersComponent;
  let fixture: ComponentFixture<ModalEditUsersComponent>;

  // Configuración inicial de la prueba antes de cada caso de test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditUsersComponent] // Se importa el componente como standalone
    })
    .compileComponents();

    // Se crea una instancia del componente y se detectan cambios iniciales
    fixture = TestBed.createComponent(ModalEditUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Caso de prueba que verifica que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
