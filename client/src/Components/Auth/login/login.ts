import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  @Output() register = new EventEmitter<boolean>();

  goToRegister(): void{
    this.register.emit(true);
  }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

}
