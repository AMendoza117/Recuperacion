import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  recoveryModalVisible: boolean = false;
  username: string = '';
  password: string = '';
  stylesFix: any;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.username, this.password).subscribe((response) => {
      if (response.success) {
        this.router.navigate([this.authService.getRedirectUrl()]);
      } else {
        // Manejar errores de inicio de sesión
        console.log('Error de inicio de sesión');
      }
    });

  }

  showRecoveryCard() {
    this.recoveryModalVisible = true;
    console.log('recoveryModalVisible:', this.recoveryModalVisible); 
  }

  hideRecoveryCard() {
    this.recoveryModalVisible = false;
    console.log('recoveryModalVisible:', this.recoveryModalVisible); 
  }

  submitRecoveryRequest() {
    // Lógica para enviar la solicitud de recuperación de contraseña
    alert("Enviar solicitud de recuperación de contraseña.");
    this.hideRecoveryCard(); // Opcional: cierra el modal después de enviar la solicitud
  }
  
}
