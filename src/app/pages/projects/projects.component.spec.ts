import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';

// Describe el conjunto de pruebas para el componente ProjectsComponent
describe('ProjectsComponent', () => {
  let component: ProjectsComponent;   // Instancia del componente a probar
  let fixture: ComponentFixture<ProjectsComponent>;  // Acceso al entorno de pruebas

  // Configuración inicial del entorno de pruebas antes de cada test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent]
    })
    .compileComponents();

    // Se crea la instancia del componente y se inicializa el fixture
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba básica para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
