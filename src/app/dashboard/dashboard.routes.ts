import { Route } from '@angular/router'; // Importa la interfaz Route de Angular para definir rutas en la aplicación
import { MainComponent } from './main/main.component'; // Importa el componente principal que se mostrará cuando se acceda a esta ruta


export const DASHBOARD_ROUTE: Route[] = [ // Define un arreglo de rutas para el módulo dashboard
  {
    path: 'main',  // Ruta que se activa cuando el usuario navega a /dashboard/main
    component: MainComponent   // Componente que se debe renderizar al visitar esa ruta
  },
];

