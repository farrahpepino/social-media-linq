import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

ReactiveFormsModule
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  @Output() login = new EventEmitter<boolean>();

  goToLogin(): void{
    this.login.emit(true);
  }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

}
