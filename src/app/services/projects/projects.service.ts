import { Injectable } from '@angular/core';

@Injectable({ // Declara el servicio como un proveedor a nivel raíz, disponible en toda la aplicación
  providedIn: 'root'
})
export class ProjectsService {

  constructor() { }  // Constructor del servicio. Aquí sepuede inyectar dependencias como HttpClient si se necesita conectarse al backend
}
