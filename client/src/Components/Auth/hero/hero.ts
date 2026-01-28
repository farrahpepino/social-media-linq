import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from '../login/login';
import { Register } from '../register/register';
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, Register, Login],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  showRegister: boolean = true;

  
  handleAuthLogIn(_: boolean) {
    this.showRegister = false; 
  }
  
  handleAuthRegister(_: boolean) {
    this.showRegister = true;  
  }
  
  
  
}
