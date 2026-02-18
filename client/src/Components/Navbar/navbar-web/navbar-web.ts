import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth-service';
import { finalize } from 'rxjs';
import { Loading } from '../../Shared/loading/loading';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { User } from '../../../Models/User';
import { UserService } from '../../../Services/user-service';
import { Search } from '../../Shared/search/search';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar-web',
  imports: [CommonModule, Loading, Search, FormsModule],
  templateUrl: './navbar-web.html',
  styleUrl: './navbar-web.css',
})

export class NavbarWeb {
  loading = false;
  search$ = new Subject<string>();
  users: User[] = [];
  searchTerm: string = ''; 

  constructor (private route: Router, private auth: AuthService, private user: UserService) {}

  ngOnInit() {
    this.search$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(value => value.trim().length > 0),
      )
      .subscribe(value => {
        this.user.searchUser(value).subscribe(users => {
          this.users = users;
        });
      });
  }

  goToHome(){
    this.route.navigateByUrl('/home');
  }

  goToProfile(){
    this.auth.getProfile().subscribe({
      next: (res) => {
        this.route.navigate(['/user', res.username]);
      },
      error: (err) => {
        console.error("Unable to fetch user's data", err);
      }
    });
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
