// Interfaz que define la estructura de las rutas del sidebar (barra lateral de navegación).
// Esta interfaz se utiliza para construir dinámicamente el menú según los permisos de rol.


// Sidebar route metadata
export interface RouteInfo {
  path: string; // Ruta a la que navega el ítem del menú
  title: string; // Título que se mostrará en el menú
  iconType: string; // Tipo de icono (por ejemplo, material-icons)
  icon: string;   // Nombre del icono a usar
  class: string;   // Clase CSS personalizada para aplicar estilos
  groupTitle: boolean;  // Si es true, se trata de un título de grupo, no de una ruta clicable
  badge: string;  // Texto del badge (etiqueta) que puede mostrarse junto al título
  badgeClass: string;   // Clase del badge para aplicar estilos
  submenu: RouteInfo[];  // Lista de submenús anidados
  rolAuthority: number[]; // Lista de roles permitidos para acceder a esta ruta (por ID)
}
