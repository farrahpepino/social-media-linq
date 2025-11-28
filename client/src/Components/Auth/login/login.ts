import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
FormGroup
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

}
