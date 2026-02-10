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

  private feedPostsSubject = new BehaviorSubject<PostModel[]>([]);
  feedPosts$ = this.feedPostsSubject.asObservable();

  private profilePostsSubject = new BehaviorSubject<PostModel[]>([]);
  profilePosts$ = this.profilePostsSubject.asObservable();

  submitPost(post: PostModel): Observable<PostModel> {
    return this.http.post<PostModel>(`${this.apiUrl}`, post, {withCredentials: true})
    .pipe(
      tap(newPost => {
        this.feedPostsSubject.next([
          newPost,
          ...this.feedPostsSubject.value
        ]);

        if (newPost.authorId === post.authorId) {
          this.profilePostsSubject.next([
            newPost,
            ...this.profilePostsSubject.value
          ]);
        }
      })
    );
  }

  deletePost(id: string){
    return this.http.delete(`${this.apiUrl}/${id}`, {withCredentials: true})
    .pipe(
      tap(() => {
        this.feedPostsSubject.next(
          this.feedPostsSubject.value.filter(p => p.id !== id)
        );
        this.profilePostsSubject.next(
          this.profilePostsSubject.value.filter(p => p.id !== id)
        );
      })
    );
  }

  getPostById(id: string): Observable<PostModel> {
    return this.http.get<PostModel>(`${this.apiUrl}/${id}`, {withCredentials: true});
  }

  getProfilePosts(userId: string): Observable<PostModel[]>{
    return this.http.get<PostModel[]>(`${this.apiUrl}/get-profile-posts/${userId}`, {withCredentials: true})
    .pipe(tap(posts => this.profilePostsSubject.next(posts)));
  }

  getFeed(userId: string): Observable<PostModel[]>{
    return this.http.get<PostModel[]>(`${this.apiUrl}/get-feed/${userId}`, {withCredentials: true})
    .pipe(tap(posts => this.feedPostsSubject.next(posts)));

  }

}
