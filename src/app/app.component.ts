import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestionClinica';

  componentName: string;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.componentName = this.getComponentNameFromUrl(event.url);
      }
    });
  }

  private getComponentNameFromUrl(url: string): string {
    // Analiza la URL para obtener el nombre del componente actual
    // Esto dependerá de cómo tengas configurado tu enrutamiento
    const parts = url.split('/');
    return parts[1]; // Puedes ajustar esto según tu estructura de enrutamiento
  }
}
