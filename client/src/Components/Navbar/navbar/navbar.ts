import { Component } from '@angular/core';
import { NavbarWeb } from '../navbar-web/navbar-web';
import { NavbarMobile } from '../navbar-mobile/navbar-mobile';

@Component({
  selector: 'app-navbar',
  imports: [NavbarWeb, NavbarMobile],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

}
