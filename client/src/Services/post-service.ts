import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../Models/Post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:5283/post';
  constructor (private http: HttpClient) {}

  submitPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}`, post, {withCredentials: true});
  }

  deletePost(id: string){
    return this.http.delete(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
}
