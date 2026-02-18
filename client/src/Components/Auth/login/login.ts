import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../Services/auth-service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Loading } from '../../Shared/loading/loading';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, Loading],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  @Output() register = new EventEmitter<boolean>();
  loading = false;
  error = false;
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
    this.loading = true;

    this.auth.login({email, password})
    .pipe(
      finalize(() => this.loading = false) 
    )
    .subscribe({
      next: (res) => {
        this.route.navigateByUrl('/home').then(() => {
          history.replaceState(null, '', '/home'); 
        }); 
      },
      error: (err) => {
        console.error('Login failed', err);
        this.error = true;
        this.loginForm.get('password')?.reset();
      }
    })
  }

}
