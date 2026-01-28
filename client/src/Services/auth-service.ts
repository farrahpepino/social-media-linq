import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from '../Models/LoginDto';
import { RegisterDto } from '../Models/RegisterDto';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5283/auth';
  constructor(private http: HttpClient){}

  login(user: LoginDto){
    return this.http.post(`${this.apiUrl}/login`, user, { withCredentials: true });
  }
  
  register(user: RegisterDto){
    return this.http.post(`${this.apiUrl}/register`, user, { withCredentials: true });
  }

  getProfile() {
    return this.http.get<User>('/auth/profile', { withCredentials: true });
  }

}
