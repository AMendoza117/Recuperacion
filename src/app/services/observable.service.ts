import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObservableService {
  private projectUpdateSubject = new BehaviorSubject<void>(null);

  notifyProjectUpdate(): void {
    console.log('Notificación de actualización enviada desde ObservableService');
    this.projectUpdateSubject.next(null);
  }

  getProjectUpdateObservable(): Observable<void> {
    return this.projectUpdateSubject.asObservable();
  }
}
