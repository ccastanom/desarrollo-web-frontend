import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class AlertService {

  // Inyección del servicio MatSnackBar de Angular Material para mostrar notificaciones tipo toast
  constructor(private _snackBar: MatSnackBar) { }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition = 'bottom',
    placementAlign: MatSnackBarHorizontalPosition = 'center'
  ) {
    this._snackBar.open(text, '', {
      duration: 5000, // duración en milisegundos que permanece visible
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName, // clase para aplicar estilo personalizado
    }); 
  }
}
