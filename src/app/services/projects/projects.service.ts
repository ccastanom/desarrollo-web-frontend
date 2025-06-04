import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from '@core/models/config';

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible a nivel global en toda la app
})
export class ProjectsService {

  // Base URL definida en el archivo de configuración
  private urlBaseServices: string = URL_SERVICIOS;

  // Inyectamos HttpClient para hacer peticiones al backend
  constructor(private readonly http: HttpClient) {}

  /**
   * Obtiene todos los proyectos.
   * - Si el usuario es ADMIN, devuelve todos los proyectos.
   * - Si el usuario es USER, devuelve solo los que le han sido asignados.
   */


  
getProjects(filters: any = {}): Observable<any> {
  const endpoint = `${this.urlBaseServices}/api/v1/projects`;

  let params = new HttpParams();
  if (filters.nombre) {
    params = params.set('nombre', filters.nombre);
  }
  if (filters.descripcion) {
    params = params.set('descripcion', filters.descripcion);
  }

  const token = sessionStorage.getItem('accessToken') || '';
  const headers = { Authorization: `Bearer ${token}` };

  return this.http.get<any>(endpoint, { params, headers });
}






  /**
   * Obtiene un proyecto específico por su ID
   */
  getProjectById(id: number): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/projects/${id}`;
    return this.http.get<any>(endpoint);
  }

  /**
   * Crea un nuevo proyecto
   */
  createProject(data: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/projects/create`;
    return this.http.post<any>(endpoint, data);
  }

  /**
   * Actualiza un proyecto existente
   */
  updateProject(data: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/projects/update`;
    return this.http.put<any>(endpoint, data);
  }

  /**
   * Elimina un proyecto por su ID
   */
  deleteProject(id: number): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/projects/delete/${id}`;
    return this.http.delete<any>(endpoint);
  }

  /**
   * Asigna un usuario a un proyecto
   */
  assignUserToProject(data: { proyecto_id: number; usuario_id: number }): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/projects/associate`;
    return this.http.post<any>(endpoint, data);
  }

  /**
   * Desasigna un usuario de un proyecto
   */
  unassignUserFromProject(data: { proyecto_id: number; usuario_id: number }): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/projects/disassociate`;
    return this.http.request('delete', endpoint, { body: data });
  }
}

