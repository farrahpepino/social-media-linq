import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../Services/auth-service';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  @Output() register = new EventEmitter<boolean>();
  constructor (private auth: AuthService){}

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

    this.auth.login({email, password}).subscribe({
      next: (res) => {
        console.log('Login success', res);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    })
  }

}
