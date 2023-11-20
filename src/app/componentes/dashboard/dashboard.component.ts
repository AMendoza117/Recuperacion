import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, Proyecto, LiderConProyectos } from 'src/app/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  proyectos: Proyecto[];
  lideresConProyectos: LiderConProyectos[];
  numProyectos: number;
  numProyectosActivos: number;
  numProyectosCompletados: number;

  constructor(private apiService: ApiService, private router: Router) { }


  ngOnInit(): void {
    this.loadProyectos();
    this.loadLideresConProyectos();
  }
  redirectToRegistrarProyecto() {
    this.router.navigate(['/registrar-proyecto']);
  }


  loadProyectos() {
    this.apiService.loadProyectos().subscribe(
      (proyectos: Proyecto[]) => {
        console.log('Proyectos cargados:', proyectos);
        this.proyectos = proyectos;
        this.numProyectos = proyectos.length;
        // Puedes ajustar esto según tu lógica para proyectos activos y completados
        this.numProyectosActivos = proyectos.filter(p => p.estadoProyecto === 'Activo').length;
        this.numProyectosCompletados = proyectos.filter(p => p.estadoProyecto === 'Completado').length;
      },
      (error) => {
        console.error('Error al cargar proyectos:', error);
      }
    );
  }

  loadLideresConProyectos() {
    this.apiService.loadLideresConProyectos().subscribe(
      (lideres: LiderConProyectos[]) => {
        console.log('Líderes con proyectos cargados:', lideres);
        this.lideresConProyectos = lideres;
      },
      (error) => {
        console.error('Error al cargar líderes con proyectos:', error);
      }
    );
  }

  redirectToProyectoDetalle(proyecto: Proyecto) {
    console.log('Datos del proyecto:', proyecto);
    if (proyecto && proyecto.idProyecto) {
      const url = ['ver-proyecto', proyecto.idProyecto];
      console.log('Navegando a:', url);
      this.router.navigate(url);
    } else {
      console.error('ID de proyecto indefinido. No se puede navegar.');
    }
  }

}
