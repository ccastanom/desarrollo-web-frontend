import { Component, Input } from '@angular/core';
import { FeatherModule } from 'angular-feather';

@Component({
    selector: 'app-feather-icons', // Selector para usar el componente como <app-feather-icons>
    templateUrl: './feather-icons.component.html', // Ruta al archivo de plantilla HTML del componente
    styleUrls: ['./feather-icons.component.scss'], // Ruta al archivo de estilos SCSS del componente
    standalone: true,
    imports: [FeatherModule], // Importa FeatherModule para usar los íconos en la plantilla
})
export class FeatherIconsComponent {
  @Input() public icon?: string; // Recibe el nombre del ícono Feather a mostrar como input desde el componente padre
  @Input() public class?: string; // Permite pasar clases CSS adicionales desde el componente padre para personalización
  constructor() {
    // constructor
  }
}
