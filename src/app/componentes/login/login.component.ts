import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  stylesFix: any;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.toastr.success('Mensaje de éxito', 'Título');
  }




  login() {
    this.authService.login(this.username, this.password).subscribe((response) => {
      if (response.success) {
        this.router.navigate([this.authService.getRedirectUrl()]);
        this.toastr.success('Mensaje de éxito', 'Título');
      } else {
        // Manejar errores de inicio de sesión
        this.toastr.error('Mensaje de error', 'Título');
        console.log('Error de inicio de sesión');
      }
    });

  }

}
