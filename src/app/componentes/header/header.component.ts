// header.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false; // Inicialmente, el usuario no está 
  componentName: string;

  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      this.componentName = this.getCurrentComponentName();
    });
  }

  ngOnInit() {

  }



  getCurrentComponentName(): string {
    // Obtén el nombre del componente actual desde la ruta activa
    const currentRoute = this.router.url;
    if (currentRoute.includes('/login')) {
      return 'login';
    }
    if (currentRoute.includes('/almacen')) {
      return 'almacen';
    }
    return ''; // Devuelve un valor predeterminado o maneja otros casos según sea necesario
  }
  
}

