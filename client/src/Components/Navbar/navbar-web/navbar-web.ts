import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth-service';
import { finalize } from 'rxjs';
import { Loading } from '../../Shared/loading/loading';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar-web',
  imports: [CommonModule, Loading],
  templateUrl: './navbar-web.html',
  styleUrl: './navbar-web.css',
})

export class NavbarWeb {
  loading = false;
  constructor (private route: Router, private auth: AuthService){}

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
