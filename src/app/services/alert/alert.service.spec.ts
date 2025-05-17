import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  // Configura el entorno de prueba antes de cada test
  beforeEach(() => {
    TestBed.configureTestingModule({});  // Configuración mínima del módulo de prueba
    service = TestBed.inject(AlertService); // Inyección del servicio a probar

  });

   // Prueba básica para verificar que el servicio se crea correctamente
  it('should be created', () => {
    expect(service).toBeTruthy(); // Verifica que la instancia del servicio no sea nula
  });
});
