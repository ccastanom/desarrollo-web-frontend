import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

// Se define una suite de pruebas para el componente HeaderComponent
describe('HeaderComponent', () => {
  let component: HeaderComponent;  // Instancia del componente que se va a probar
  let fixture: ComponentFixture<HeaderComponent>; // Representa el entorno del componente para las pruebas
  
  beforeEach(waitForAsync(() => {  // Configura el entorno de prueba cargando el componente como standalone
    TestBed.configureTestingModule({
    imports: [HeaderComponent]
}).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {  // Prueba verifica que el componente se crea correctamente
    expect(component).toBeTruthy();   // Asegura que el componente existe y está correctamente inicializado
  });
});
