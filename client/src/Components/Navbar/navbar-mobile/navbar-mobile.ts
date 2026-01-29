import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Loading } from '../../Shared/loading/loading';
import { AuthService } from '../../../Services/auth-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-navbar-mobile',
  imports: [CommonModule, Loading],
  templateUrl: './navbar-mobile.html',
  styleUrl: './navbar-mobile.css',
})
export class NavbarMobile {
  loading = false;
  constructor (private auth: AuthService) {}

  signOut(){
    this.loading = true;
    this.auth.logout()
    .pipe(
      finalize(() => this.loading = false) 
    );
    
    window.location.replace('/'); 
  }
}
