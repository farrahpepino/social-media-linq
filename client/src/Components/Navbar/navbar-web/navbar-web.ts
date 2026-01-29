import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth-service';

@Component({
  selector: 'app-navbar-web',
  imports: [],
  templateUrl: './navbar-web.html',
  styleUrl: './navbar-web.css',
})
export class NavbarWeb {
  constructor (private route: Router, private auth: AuthService){}

  signOut(){
    this.auth.logout();
    window.location.replace('/'); 
  }
}
