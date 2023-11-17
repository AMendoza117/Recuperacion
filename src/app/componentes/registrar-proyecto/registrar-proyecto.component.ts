import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService, Responsable } from './../../api.service';

@Component({
  selector: 'app-registrar-proyecto',
  templateUrl: './registrar-proyecto.component.html',
  styleUrls: ['./registrar-proyecto.component.css']
})
export class RegistrarProyectoComponent implements OnInit {

  proyectoForm: FormGroup;
  responsables: Responsable[];
  documentoForm = new FormGroup({
    fileSource: new FormControl('', [Validators.required]),
  });

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

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.documentoForm.patchValue({
        fileSource: file
      });
    }
  }

  generateFolio(nombreCorto: string): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const lastConsecutivo = '001'; // Cambiar esto por la lógica real para obtener el último consecutivo
    return `${year}${month}-${nombreCorto}-${lastConsecutivo}`;
  }

  /*
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
    */
  // registrar-proyecto.component.ts

  onSubmit() {
    if (this.proyectoForm.valid && this.documentoForm.valid) {
      const nombreCorto = this.proyectoForm.value.nombreCorto;
      const folio = this.generateFolio(nombreCorto);

      const proyectoData = {
        folio,
        ...this.proyectoForm.value
      };

      const documento = this.documentoForm.get('fileSource').value;

      console.log('Datos a enviar (Proyecto):', proyectoData);
      console.log('Folio', folio);

      this.apiService.registrarProyecto(proyectoData).subscribe(
        (response) => {
          if (response && response.success) {
            console.log('Proyecto registrado con éxito.');
            // Luego de registrar el proyecto, registrar el documento

            this.apiService.registrarDocumento(folio, documento).subscribe(
              (documentoResponse) => {
                if (documentoResponse && documentoResponse.success) {
                  console.log('Documento registrado con éxito.');
                  this.documentoForm.reset(); // Esto limpiará el formulario del documento
                } else {
                  console.error('Error al registrar documento.');
                }
              },
              (documentoError) => {
                console.error('Error en la solicitud para registrar documento: ', documentoError);
              }
            );

          } else {
            console.error('Error al registrar proyecto.');
          }
        },
        (error) => {
          console.error('Error en la solicitud para registrar proyecto: ', error);
        }
      );
    }
  }

}
