import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '@core/models/config';
import { Observable } from 'rxjs';

// Decorador que indica que el servicio estará disponible en toda la aplicación
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // Se define la URL base para todas las peticiones relacionadas con usuarios
  urlBaseServices: string = URL_SERVICIOS;

  // Se inyecta el cliente HTTP que permite hacer solicitudes al backend
  constructor(private readonly http: HttpClient) {}

  // Método para crear un nuevo usuario en el backend
  createUser(userData: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/create`;
    return this.http.post<any>(endpoint, userData);
  }

  // Método para actualizar un usuario existente usando su ID
  updateUser(userId: number, userData: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/update/${userId}`;
    return this.http.put<any>(endpoint, userData);
  }

  // Método para eliminar un usuario por su ID
  deleteUser(userId: number): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/delete/${userId}`;
    return this.http.delete<any>(endpoint);
  }

  // Método para obtener todos los usuarios filtrados por nombre o email, asociados al administrador autenticado
  getAllUserByAdministrator(filters?: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users`;
    const params = new HttpParams({
      fromObject: {
        nombre: filters?.name || '',
        email: filters?.email || ''
      }
    });
    return this.http.get<any>(endpoint, { params });
  }

  // Método que obtiene todos los usuarios que tienen el rol de administrador (rol_id = 1)
  getAllAdministrator(): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/rol/1`;
    return this.http.get<any>(endpoint);
  }

  // Método que obtiene todos los usuarios que tienen el rol de usuario normal (rol_id = 2)
  getAllUsers(): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/rol/2`;
    return this.http.get<any>(endpoint);
  }
}
