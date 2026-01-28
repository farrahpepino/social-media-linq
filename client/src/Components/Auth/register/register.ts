import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../Services/auth-service';

ReactiveFormsModule
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  @Output() login = new EventEmitter<boolean>();
  constructor (private auth: AuthService){}
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

    this.auth.register({username, email, password}).subscribe({
      next: (res) => {
        console.log('Register success', res);
      },
      error: (err) => {
        console.error('Register failed', err);
      }
    });
  }
}
