import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ObservableService } from './services/observable.service';
import { Responsable } from './Models/responsable.model';
import { LiderConProyectos } from './Models/liderConProyectos.model';
import { Proyecto } from './Models/Proyecto.model';
import { Lider } from './Models/Lider.model';
import { VerProyecto } from './Models/VerProyecto.model';
import { Stakeholder } from './Models/Stakeholder.model';
import { PagosParciales } from './Models/PagosParciales.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private observableService: ObservableService) { }

  // Método para realizar una solicitud GET a una API en el backend.
  public get(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.get(url);
  }

  // Método para realizar una solicitud POST a una API en el backend.
  public post(endpoint: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, data, { headers });
  }

  // Cargar stakeholders
  loadStakeholders(): Observable<Stakeholder[]> {
    const url = `${this.apiUrl}/api/loadStakeholders.php`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<Stakeholder[]>(url, { headers });
  }

  // Cargar responsables
  loadResponsables(): Observable<Responsable[]> {
    const url = `${this.apiUrl}/api/loadResponsables.php`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<Responsable[]>(url, { headers });
  }
  // Registrar proyecto
  registrarProyecto(proyecto: any): Observable<any> {
    const url = `${this.apiUrl}/api/registrarProyecto.php`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, proyecto, { headers })
      .pipe(tap(() => this.observableService.notifyProjectUpdate()));
  }

  //registrarDocumentos
  registrarDocumento(folio: string, documento: File): Observable<any> {
    const url = `${this.apiUrl}/api/registrarDocumento.php`;

    const formData = new FormData();
    formData.append('folio', folio);
    formData.append('documento', documento);

    return this.http.post(url, formData);
  }

  loadProyectos(): Observable<Proyecto[]> {
    const url = `${this.apiUrl}/api/loadProyectos.php`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<Proyecto[]>(url, { headers });
  }

  getProyectoDetallado(idProyecto: number): Observable<VerProyecto> {
    const url = `${this.apiUrl}/api/loadProyectoById.php?idProyecto=${idProyecto}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<VerProyecto>(url, { headers });
  }

  agregarStakeholder(idProyecto: number, stakeholder: Stakeholder): Observable<any> {
    const url = `${this.apiUrl}/api/registrarStakeholder.php`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const data = {
      idProyecto: idProyecto,
      nombreCompleto: stakeholder.nombreCompleto,
      correoElectronico: stakeholder.correoElectronico,
      telefono: stakeholder.telefono
    };

    return this.http.post(url, data, { headers });
  }

  loadLideresConProyectos(): Observable<LiderConProyectos[]> {
    const url = `${this.apiUrl}/api/loadLideresConProyectos.php`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<LiderConProyectos[]>(url, { headers });
  }

  terminado(idProyecto: number): Observable<any> {
    const url = `${this.apiUrl}/api/terminado.php`;
    return this.http.post(url, { idProyecto })
      .pipe(tap(() => this.observableService.notifyProjectUpdate()));;
  }

  enviarCorreo(stakeholder: Stakeholder): Observable<any> {
    const url = `${this.apiUrl}/api/enviarEmail.php`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, JSON.stringify(stakeholder), { headers, withCredentials: true });
  }


  registrarPagosParciales(idProyecto: number, pagosParciales: PagosParciales): Observable<any> {
    const url = `${this.apiUrl}/api/registrarPagoParcial.php`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const data = {
      idProyecto: idProyecto,
      monto: pagosParciales.monto,
      fechaPago: pagosParciales.fechaPago
    };

    return this.http.post(url, data, { headers });
  }

  getLastConsecutivo(): Observable<number> {
    const url = `${this.apiUrl}/api/getLastConsecutivo.php`;
    return this.http.get<number>(url);
  }

  registrarLider(lider: Lider): Observable<any> {
    const url = `${this.apiUrl}/api/registrarLider.php`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const data = {
      nombre: lider.nombre
    };

    return this.http.post(url, data, { headers });
  }

}
