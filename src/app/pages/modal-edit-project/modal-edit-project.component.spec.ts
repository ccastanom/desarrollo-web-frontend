import { ComponentFixture, TestBed } from '@angular/core/testing'; // Importa las herramientas necesarias para las pruebas unitarias
// Importa el componente que se va a probar
import { ModalEditProjectComponent } from './modal-edit-project.component';

// Define el bloque de pruebas para el componente
describe('ModalEditProjectComponent', () => {
  // Declara las variables necesarias para manejar el componente y su entorno de prueba
  let component: ModalEditProjectComponent;
  let fixture: ComponentFixture<ModalEditProjectComponent>;

  // Se ejecuta antes de cada prueba (async garantiza que termine la configuración antes de continuar)
  beforeEach(async () => {
    // Configura el entorno de pruebas (TestBed) con el componente como importación
    await TestBed.configureTestingModule({
      imports: [ModalEditProjectComponent]
    })
    .compileComponents(); // Compila los componentes declarados

    // Crea una instancia del componente para ser probada
    fixture = TestBed.createComponent(ModalEditProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba básica: verifica que el componente se haya creado correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
