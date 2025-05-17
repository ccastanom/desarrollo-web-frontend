import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';

describe('UsersService', () => { // Describe el grupo de pruebas para el servicio de usuarios
  let service: UsersService;

  // crea un módulo de prueba que provea el servicio
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersService); // Inyecta una instancia del servicio a probar
  });

  // Prueba básica que verifica que el servicio ha sido creado correctamente
  it('should be created', () => {
    expect(service).toBeTruthy(); // Valida que la instancia del servicio no sea null ni undefined
  });
});
