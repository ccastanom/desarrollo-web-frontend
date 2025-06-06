// Importaciones necesarias para las pruebas
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateUsersComponent } from './modal-create-users.component';

// Descripción general del conjunto de pruebas para el componente ModalCreateUsersComponent
describe('ModalCreateUsersComponent', () => {
  let component: ModalCreateUsersComponent;  // Instancia del componente que se va a probar
  let fixture: ComponentFixture<ModalCreateUsersComponent>;

  // beforeEach se ejecuta antes de cada prueba individual
  beforeEach(async () => {  // Configuración inicial del entorno de pruebas para el componente.
    await TestBed.configureTestingModule({
      imports: [ModalCreateUsersComponent]
    })
    .compileComponents();
    
    // Crea una instancia del componente y su fixture (contenedor)
    fixture = TestBed.createComponent(ModalCreateUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba básica: verifica que el componente se cree correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
