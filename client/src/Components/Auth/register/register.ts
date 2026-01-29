import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../Services/auth-service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Loading } from '../../Shared/loading/loading';


ReactiveFormsModule
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, Loading],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  @Output() login = new EventEmitter<boolean>();
  loading = false;
  constructor (private auth: AuthService, private route: Router){}
  goToLogin(): void{
    this.login.emit(true);
  }

  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit(){
    const username = this.registerForm.get('username')!.value!;
    const email = this.registerForm.get('email')!.value!;
    const password = this.registerForm.get('password')!.value!;

    const user = {
      username: username,
      email: email,
      password: password
    };

    this.loading = true;

    this.auth.register(user)
    .pipe(
      finalize(() => this.loading = false) 
    )
    .subscribe({
      next: (res) => {
        console.log('Register success', res);
        this.route.navigateByUrl('/home').then(() => {
          history.replaceState(null, '', '/home'); 
        });      
      },
      error: (err) => {
        console.error('Register failed', err);
      }
    });
  }
}
