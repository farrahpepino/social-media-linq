import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Loading } from '../../Shared/loading/loading';
import { AuthService } from '../../../Services/auth-service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-mobile',
  imports: [CommonModule, Loading],
  templateUrl: './navbar-mobile.html',
  styleUrl: './navbar-mobile.css',
})
export class NavbarMobile {

  loading = false;
  constructor (private route: Router, private auth: AuthService) {}

  goToHome(){
    this.route.navigateByUrl('/home');
  }

  goToProfile(){
    this.route.navigateByUrl('/profile');
  }

  signOut(){
    this.loading = true;
    this.auth.logout()
    .pipe(
      finalize(() => this.loading = false) 
    );
    
    window.location.replace('/'); 
  }
}
