import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root', // Componente raíz de la aplicación
  standalone: true, // Indica que este componente es independiente y no necesita un módulo
  imports: [CommonModule, RouterModule], // Módulos que este componente puede usar
  templateUrl: './app.component.html', // Ruta al archivo HTML del componente
  styleUrls: ['./app.component.scss'], // Ruta al archivo de estilos del componente
})
export class AppComponent {
  currentUrl!: string; // Variable para almacenar la URL actual

  constructor(public _router: Router) {
    // Se suscribe a los eventos del router para detectar cambios en la navegación
    this._router.events.subscribe((routerEvent: Event) => {

      // Si se detecta el inicio de una navegación, extrae la última parte de la URL
      if (routerEvent instanceof NavigationStart) {
        this.currentUrl = routerEvent.url.substring(
          routerEvent.url.lastIndexOf('/') + 1
        );
      }

      // Si se detecta el fin de una navegación, simplemente se puede hacer algún proceso si se necesita
      if (routerEvent instanceof NavigationEnd) {
        /* empty */
      }
      window.scrollTo(0, 0); // Cada vez que cambia la ruta, se fuerza el scroll al inicio de la página
    });
  }
}
