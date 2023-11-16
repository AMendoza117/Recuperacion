import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { RegistrarProyectoComponent } from './componentes/registrar-proyecto/registrar-proyecto.component';

const routes: Routes = [
  {path: '',redirectTo:'dashboard', pathMatch: 'full'},
  {path: 'dashboard',component:DashboardComponent},
  {path: 'registrar-proyecto',component:RegistrarProyectoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
