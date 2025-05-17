// Importaciones necesarias para el manejo del DOM, navegación y módulos visuales (Material, íconos, rutas)
import { DOCUMENT, NgClass } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConfigService } from '@config'; import { InConfiguration, AuthService } from '@core';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

// Decorador que define el componente de encabezado principal (Header)
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    MatButtonModule,
    MatMenuModule,
    FeatherIconsComponent,
  ],
})
export class HeaderComponent implements OnInit { // Variables para configuración, estado de la barra, usuario actual...
  public config!: InConfiguration;
  isNavbarCollapsed = true;
  isOpenSidebar?: boolean;
  docElement?: HTMLElement;
  isFullScreen = false;
  constructor( // Constructor que inyecta servicios autenticación y configuración
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly renderer: Renderer2,
    public readonly elementRef: ElementRef,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
     this.userLogged = this.authService.getAuthFromSessionStorage().nombre; // Se obtiene el nombre del usuario autenticado desde el almacenamiento de sesión
   }

   userLogged: string | undefined = '';
   
  ngOnInit() { // Carga inicial de configuración y referencia al documento HTML
    this.config = this.configService.configData;
    this.docElement = document.documentElement;
  }

  callFullscreen() { // Alterna el modo de pantalla completa
    if (!this.isFullScreen) {
      if (this.docElement?.requestFullscreen != null) {
        this.docElement?.requestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
    this.isFullScreen = !this.isFullScreen;
  }
  mobileMenuSidebarOpen(event: Event, className: string) { // Abre o cierra el menú lateral en vista móvil
    const hasClass = (event.target as HTMLInputElement).classList.contains(
      className
    );
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }
  callSidemenuCollapse() { // Alterna el colapso del menú lateral izquierdo
    const hasClass = this.document.body.classList.contains('side-closed');
    if (hasClass) {
      this.renderer.removeClass(this.document.body, 'side-closed');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
      localStorage.setItem('collapsed_menu', 'false');
    } else {
      this.renderer.addClass(this.document.body, 'side-closed');
      this.renderer.addClass(this.document.body, 'submenu-closed');
      localStorage.setItem('collapsed_menu', 'true');
    }
  }

   logout() { // Ejecuta el cierre de sesión
    this.authService.logout();
   }
}
