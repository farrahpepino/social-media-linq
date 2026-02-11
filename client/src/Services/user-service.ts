import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = 'http://localhost:5283/user';
  constructor (private http: HttpClient) {}

  searchUser(input: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.apiUrl}/search/${input}`,
      { withCredentials: true }
    );
  }
  
}
