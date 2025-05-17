import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbComponent } from './breadcrumb.component';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent; // Instancia del componente a probar
  let fixture: ComponentFixture<BreadcrumbComponent>; // Contenedor del componente renderizado

  // Configura el entorno de pruebas antes de cada ejecución
  beforeEach(async () => {
    await TestBed.configureTestingModule({ // Importa el componente a testear (standalone)
    imports: [BreadcrumbComponent] // Compila los componentes declarados
})
    .compileComponents();
  });

  // Inicializa el componente y su entorno de pruebas
  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();// Aplica la detección de cambios para renderizar la vista
  });

  // Prueba básica para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente exista
  });
});
