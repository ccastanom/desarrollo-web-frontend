import { TestBed } from '@angular/core/testing'; // Importa las herramientas para pruebas unitarias en Angular

import { ProjectsService } from './projects.service'; // Importa el servicio que se va a probar

describe('ProjectsService', () => {
  let service: ProjectsService;

  // Antes de cada prueba, se configura el entorno de prueba con TestBed
  beforeEach(() => {
    TestBed.configureTestingModule({}); // Configura un módulo de prueba sin dependencias adicionales
    service = TestBed.inject(ProjectsService);  // Inyecta una instancia del servicio a probar
  });

   // Caso de prueba: verifica que el servicio se haya creado correctamente
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
