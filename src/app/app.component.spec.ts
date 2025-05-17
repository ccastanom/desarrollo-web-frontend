import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Simula el enrutamiento
import { AppComponent } from './app.component'; // Componente principal de la aplicación

// Describe el conjunto de pruebas unitarias para el componente AppComponent
describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule], // Se importa el módulo de rutas en modo testing
    declarations: [AppComponent] // Se declara el componente que será probado

}).compileComponents();
  }));

  // Prueba que verifica que el componente AppComponent se crea correctamente
  it('should create the app', () => { // Prueba que verifica que el componente AppComponent se crea correctamente
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  // Prueba que verifica que el título del componente sea 'angulardark'
  it(`should have as title 'angulardark'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angulardark');
  });

   // Prueba que verifica que el título se renderice correctamente en una etiqueta <h1>
  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Activa la detección de cambios para que se renderice el HTML
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Welcome to angulardark!'
    );
  });
});
