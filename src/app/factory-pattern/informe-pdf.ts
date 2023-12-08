// informe-pdf.ts
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Informe } from './informe.interface';
import { ApiService } from 'src/app/api.service'; 
import { Proyecto } from '../Models/Proyecto.model';

export class InformePDF implements Informe {
  constructor(private apiService: ApiService) {}

  async generarInforme(): Promise<void> {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    // Obtener datos de la base de datos a través del servicio de API
    const proyectos: Proyecto[] = await this.apiService.loadProyectos().toPromise();

    // Transformar datos en contenido de informe
    const content = [
      { text: 'Informe en formato PDF', style: 'header' },
      { text: 'Datos de Proyectos', style: 'subheader' },
      this.createTable(proyectos),
    ];

    // Definición del documento PDF
    const documentDefinition = {
      content,
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
        },
      },
    };

    // Generar el PDF
    pdfMake.createPdf(documentDefinition).open();
  }

  private createTable(data: Proyecto[]): any {
    // Definir encabezados de la tabla
    const headers = ['ID Proyecto', 'Nombre', 'Estado'];

    // Mapear datos para la tabla
    const body = data.map((proyecto) => [proyecto.idProyecto, proyecto.nombreCorto, proyecto.estadoProyecto]);

    // Agregar encabezados y datos a la tabla
    return {
      table: {
        headerRows: 1,
        widths: ['auto', '*', 'auto'],
        body: [headers, ...body],
      },
    };
  }
}