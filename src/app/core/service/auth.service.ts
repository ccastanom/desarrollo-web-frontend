import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '@core/models/config';
import * as jwt from "jwt-decode";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  urlBaseServices: string = URL_SERVICIOS;


  constructor( private readonly http: HttpClient,private readonly router: Router) {
 
  }

  login(email: string, password: string): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/auth/login`;
    return this.http.post<any>(endpoint, { email, password });
  }

  isAuthenticated(): boolean {
    const accessToken = sessionStorage.getItem('accessToken');
    return accessToken !== null;
  }

  getAuthFromSessionStorage(): any {
    try {
      const lsValue = sessionStorage.getItem('accessToken');
      if (!lsValue) {
        return undefined;
      }
      const decodedToken: any = jwt.jwtDecode(lsValue);

      return decodedToken;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  setToken(token: string): void {
  sessionStorage.setItem('accessToken', token); // ← el nombre correcto
}


  logout() {
    sessionStorage.removeItem('accessToken');
    this.router.navigate(['/authentication/signin'], {
      queryParams: {},
    });
  }

  getRoleInfoByToken(): { id: number, roleId: number, roleName: string } | undefined {
  try {
    const decodedToken: any = this.getAuthFromSessionStorage();
    const id = decodedToken.id; // 👈 Extraemos el ID
    const roleId = decodedToken.rol_id;
    let roleName = '';

    if (roleId === 1) {
      roleName = 'Administrador';
    } else if (roleId === 2) {
      roleName = 'Usuario';
    } else {
      return undefined;
    }

    return { id, roleId, roleName }; // 👈 Incluimos el ID en la respuesta
  } catch (error) {
    console.error(error);
    return undefined;
  }
}



}