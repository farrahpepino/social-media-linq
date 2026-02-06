import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostModel } from '../Models/PostModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:5283/post';
  constructor (private http: HttpClient) {}

  submitPost(post: PostModel): Observable<PostModel> {
    return this.http.post<PostModel>(`${this.apiUrl}`, post, {withCredentials: true});
  }

  deletePost(id: string){
    return this.http.delete(`${this.apiUrl}/${id}`, {withCredentials: true});
  }

  getPostById(id: string): Observable<PostModel> {
    return this.http.get<PostModel>(`${this.apiUrl}/${id}`, {withCredentials: true});
  }

  getProfilePosts(userId: string): Observable<PostModel[]>{
    return this.http.get<PostModel[]>(`${this.apiUrl}/get-profile-posts/${userId}`, {withCredentials: true});
  }

  getFeed(userId: string): Observable<PostModel[]>{
    return this.http.get<PostModel[]>(`${this.apiUrl}/get-feed/${userId}`, {withCredentials: true});
  }

}
