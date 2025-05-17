import { Component, Input } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-breadcrumb', // Selector para usar este componente en HTML
    templateUrl: './breadcrumb.component.html', // Archivo de plantilla asociado
    styleUrls: ['./breadcrumb.component.scss'], // Estilos específicos del componente
    standalone: true, // Especifica que es un componente independiente
    imports: [RouterLink, FeatherModule],
})
export class BreadcrumbComponent {

  // Recibe el título que se mostrará en el breadcrumb
  @Input()
  title!: string;
  // Recibe los ítems que conforman el rastro de navegación (breadcrumbs)
  @Input()
  items!: string[];
  // Recibe el ítem activo o actual en el rastro de navegación
  @Input()
  active_item!: string;

  constructor() {
    //constructor
  }
}
