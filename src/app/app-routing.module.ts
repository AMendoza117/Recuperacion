import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { RegistrarProyectoComponent } from './componentes/registrar-proyecto/registrar-proyecto.component';
import { VerProyectoComponent } from './componentes/ver-proyecto/ver-proyecto.component';
import { LoginComponent } from './componentes/login/login.component';

const routes: Routes = [
  {path: '',redirectTo:'login', pathMatch: 'full'},
  {path: 'dashboard',component:DashboardComponent},
  {path: 'registrar-proyecto',component:RegistrarProyectoComponent},
  {path: 'ver-proyecto/:id',component:VerProyectoComponent},
  {path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
