import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatherIconsComponent } from './feather-icons.component';

// Describe un conjunto de pruebas para el componente FeatherIconsComponent
describe('FeatherIconsComponent', () => {
  let component: FeatherIconsComponent; // Instancia del componente a probar
  let fixture: ComponentFixture<FeatherIconsComponent>; // Fixture que contiene el entorno de pruebas del componente

  // Configura el entorno de pruebas antes de cada test de forma asíncrona
  beforeEach(async () => {
    await TestBed.configureTestingModule({ 
    imports: [FeatherIconsComponent] // Se importa el componente como standalone
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatherIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba verifica que el componente se haya creado correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
