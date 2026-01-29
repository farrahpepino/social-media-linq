import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../Services/auth-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  @Output() register = new EventEmitter<boolean>();
  constructor (private auth: AuthService, private route: Router){}

  goToRegister(): void{
    this.register.emit(true);
  }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit() {
    const email = this.loginForm.get('email')!.value!;
    const password = this.loginForm.get('password')!.value!;
    this.route.navigateByUrl('/home')

    this.auth.login({email, password}).subscribe({
      next: (res) => {
        console.log('Login success', res);
        // this.route.navigateByUrl('/home')
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    })
  }

}
