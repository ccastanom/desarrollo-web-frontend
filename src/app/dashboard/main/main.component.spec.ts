// Se importan herramientas necesarias para pruebas unitarias con Angular
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MainComponent } from './main.component';

// Se inicia una suite de pruebas para el componente MainComponent
describe('MainComponent', () => {
  let component: MainComponent;   // Instancia del componente a probar
  let fixture: ComponentFixture<MainComponent>;  // Objeto que representa el entorno de prueba del componente
  
  // Configuración inicial del entorno de pruebas de Angular
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({ 
    imports: [MainComponent] // Se importa el componente que se va a probar
}).compileComponents();      // Compila los componentes
  }));
  beforeEach(() => {   // Se crea una instancia del componente y se activa la detección de cambios
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {  // Prueba básica: verifica que el componente se cree correctamente
    expect(component).toBeTruthy();
  });
});
