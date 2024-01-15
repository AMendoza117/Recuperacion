import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  applyLoginStyles: boolean = true; 

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.username, this.password).subscribe((response) => {
      if (response.success) {
        this.router.navigate([this.authService.getRedirectUrl()]);
        this.applyLoginStyles = false;
      } else {
        // Manejar errores de inicio de sesión
        console.log('Error de inicio de sesión');
      }
    });
    
  }

}