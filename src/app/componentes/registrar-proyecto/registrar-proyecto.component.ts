import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, Responsable } from './../../api.service';

@Component({
  selector: 'app-registrar-proyecto',
  templateUrl: './registrar-proyecto.component.html',
  styleUrls: ['./registrar-proyecto.component.css']
})
export class RegistrarProyectoComponent implements OnInit {

  proyectoForm: FormGroup;
  responsables: Responsable[];

  constructor(private apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit() {
    this.proyectoForm = this.fb.group({
      nombreProyecto: ['', [Validators.required]],
      nombreCorto: ['', [Validators.required, Validators.maxLength(10)]],
      descripcion: ['', [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaTermino: ['', [Validators.required]],
      idResponsable: [null, [Validators.required]],
      costo: ['', [Validators.required, Validators.min(0)]],
    });

    this.loadResponsables();
  }

  loadResponsables() {
    this.apiService.loadResponsables().subscribe(
      (responsables: Responsable[]) => {
        console.log('Responsables cargados:', responsables);
        this.responsables = responsables;
      },
      (error) => {
        console.error('Error al cargar responsables:', error);
      }
    );
  }

  generateFolio(nombreCorto: string): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const lastConsecutivo = '001'; // Cambiar esto por la lógica real para obtener el último consecutivo
    return `${year}${month}-${nombreCorto}-${lastConsecutivo}`;
  }

  onSubmit() {
    if (this.proyectoForm.valid) {
      const nombreCorto = this.proyectoForm.value.nombreCorto;
      const folio = this.generateFolio(nombreCorto);

      const proyectoData = {
        folio,
        ...this.proyectoForm.value
        
      };

      console.log('Datos a enviar:', proyectoData);
      console.log('Folio', folio);

      this.apiService.registrarProyecto(proyectoData).subscribe(
        (response) => {
          if (response && response.success) {
            console.log('Proyecto registrado con éxito.');
          } else {
            console.error('Error al registrar proyecto.');
          }
        },
        (error) => {
          console.error('Error en la solicitud: ', error);
        }
      );
    }
  }
}
