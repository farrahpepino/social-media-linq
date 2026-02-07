import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostModel } from '../Models/PostModel';
import { Observable } from 'rxjs';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:5283/post';
  constructor (private http: HttpClient) {}
  private postsSubject = new BehaviorSubject<PostModel[]>([]);
  posts$ = this.postsSubject.asObservable();


  submitPost(post: PostModel): Observable<PostModel> {
    return this.http.post<PostModel>(`${this.apiUrl}`, post, {withCredentials: true})
      .pipe(
        tap(newPost => {
          this.postsSubject.next(
            [
              newPost,
              ...this.postsSubject.value
            ]
          );
        })
      );
  }

  deletePost(id: string){
    return this.http.delete(`${this.apiUrl}/${id}`, {withCredentials: true})
      .pipe(
        tap(() => {
          this.postsSubject.next(
            this.postsSubject.value.filter(p => p.id !== id)
          );
        })
      );
  }

  getPostById(id: string): Observable<PostModel> {
    return this.http.get<PostModel>(`${this.apiUrl}/${id}`, {withCredentials: true});
  }

  getProfilePosts(userId: string): Observable<PostModel[]>{
    return this.http.get<PostModel[]>(`${this.apiUrl}/get-profile-posts/${userId}`, {withCredentials: true})
      .pipe(
        tap(posts => this.postsSubject.next(posts))
      );
  }

  getFeed(userId: string): Observable<PostModel[]>{
    return this.http.get<PostModel[]>(`${this.apiUrl}/get-feed/${userId}`, {withCredentials: true})
      .pipe(
        tap(posts => this.postsSubject.next(posts))
      );
  }

}
