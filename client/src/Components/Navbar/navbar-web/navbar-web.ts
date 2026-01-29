import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-web',
  imports: [],
  templateUrl: './navbar-web.html',
  styleUrl: './navbar-web.css',
})
export class NavbarWeb {
  constructor (private route: Router){}
  
  onClick(){
    this.route.navigateByUrl('/')
  }
}
