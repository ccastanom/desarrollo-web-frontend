import { Component } from '@angular/core'; // Importación del decorador principal de Angular para definir un componente


@Component({
  selector: 'app-main', // Selector que permite usar este componente en HTML como <app-main></app-main>
  templateUrl: './main.component.html', // Archivo HTML asociado que contiene la plantilla visual del componente
  styleUrls: ['./main.component.scss'], // Archivo SCSS con los estilos específicos de este componente
  standalone: true,  // Este componente se declara como "standalone", lo que significa que no necesita estar dentro de un módulo
  imports: [
    // Lista de módulos importados para usar dentro de la plantilla (actualmente vacía)
  ],
})
export class MainComponent {
  

  constructor() {
    
  }
  
}
