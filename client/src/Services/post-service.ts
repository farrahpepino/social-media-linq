import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../Models/Post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:5283/post';
  constructor (private http: HttpClient) {}

  submitPost(post: Post) {
    // get logged in content, attach author id
    return this.http.post(`${this.apiUrl}`, post);
  }

  deletePost(id: string){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
