import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from '../login/login';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [Login, CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  showLogin = true;
  
  toggleForm(){
    this.showLogin = !this.showLogin;
  }
}
