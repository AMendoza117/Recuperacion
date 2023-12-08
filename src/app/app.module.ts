import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { RegistrarProyectoComponent } from './componentes/registrar-proyecto/registrar-proyecto.component';
import { VerProyectoComponent } from './componentes/ver-proyecto/ver-proyecto.component';
import { InformePDFFactory } from './factory-pattern/informe-pdf.factory';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    RegistrarProyectoComponent,
    VerProyectoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{ provide: 'InformeFactory', useClass: InformePDFFactory }],
  bootstrap: [AppComponent]
})
export class AppModule { }
