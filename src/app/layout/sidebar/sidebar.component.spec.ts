import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component'; // Componente que se va a probar

describe('SidebarComponent', () => { // Descripción general del conjunto de pruebas para el componente Sidebar
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  // Configuración inicial del entorno de pruebas antes de que se ejecuten los tests
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [SidebarComponent]
}).compileComponents();
  }));

  // Se crea una instancia del componente y se inicializa antes de cada test
  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // activa la detección de cambios para Angular
  });
  it('should create', () => { // Prueba básica para verificar que el componente fue creado correctamente
    expect(component).toBeTruthy();
  });
});
