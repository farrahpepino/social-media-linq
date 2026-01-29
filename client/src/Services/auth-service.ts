import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from '../Models/LoginDto';
import { RegisterDto } from '../Models/RegisterDto';
import { User } from '../Models/User';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5283/auth';
  private loggedIn = false; 

  constructor(private http: HttpClient){}

  login(user: LoginDto): Observable<any>{
    this.loggedIn = true;
    return this.http.post(`${this.apiUrl}/login`, user, { withCredentials: true });
  }
  
  register(user: RegisterDto): Observable<any>{
    this.loggedIn = true;
    return this.http.post(`${this.apiUrl}/register`, user, { withCredentials: true });
  }

  logout(){
    this.loggedIn = false;
    return this.http.post(`${this.apiUrl}/logout`, {withCredentials: true})
  }

  getProfile(){
    return this.http.get<User>('/auth/profile', { withCredentials: true });
  }

  isAuthenticated(){
    return this.loggedIn;
  }

}
