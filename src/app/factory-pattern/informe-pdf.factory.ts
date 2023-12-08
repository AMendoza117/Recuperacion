// informe-pdf.factory.ts
import { Injectable } from '@angular/core'; 
import { InformeFactory } from './informe-factory.interface';
import { InformePDF } from './informe-pdf';
import { Informe } from './informe.interface';
import { ApiService } from 'src/app/api.service';

@Injectable({ providedIn: 'root' }) 
export class InformePDFFactory implements InformeFactory {
  constructor(private apiService: ApiService) {}

  crearInforme(): Informe {
    return new InformePDF(this.apiService);
  }
}
