import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/User';
import { Follower } from '../Models/Follower';

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

  getUser(username: string): Observable<User> {
    return this.http.get<User>(
      `${this.apiUrl}/${username}`,
      { withCredentials: true }
    );
  }

  followUser(followeeId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/follow/${followeeId}`,{}, { withCredentials: true });
  }  

  unfollowUser(followeeId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/unfollow/${followeeId}`, { withCredentials: true });
  }  

  getFollowStatus(followeeId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/follow-status/${followeeId}`, { withCredentials: true });
  }  

  getFollowing(userId: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/following/${userId}`, { withCredentials: true });
  }  

  getFollowers(userId: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/followers/${userId}`, { withCredentials: true });
  }  
  
}
