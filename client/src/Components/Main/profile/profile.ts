import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../Navbar/navbar/navbar';
import { Post } from '../../Shared/post/post';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../Services/post-service';
import { PostModel } from '../../../Models/PostModel';
import { AuthService } from '../../../Services/auth-service';
import { User } from '../../../Models/User';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../Services/user-service';

@Component({
  selector: 'app-profile',
  imports: [Navbar, Post, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  posts: PostModel[] = [];
  selectedPost: string | null = null;
  username: string = '';
  user: User | null = null;

  constructor(private postService: PostService, private aRoute: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe(params => {
      this.username = params.get('username')!;
      this.loadProfile(this.username);
    });
  }

  loadProfile(username: string) {
    this.userService.getUser(username).subscribe({
      next: (res) => {
        this.user = res;
        this.postService.getProfilePosts(res.id!).subscribe({
          next: (response) => {
            this.posts = response;
          },
          error: (err) => {
            console.error("Unable to fetch posts:", err);
          }
        });
      },
      error: (err) => {
        console.error("Unable to get user's data", err);
      }
    });
  }

  showDropdown(id: string){
    this.selectedPost = this.selectedPost === id ? null : id;
  }

  deletePost(id: string) {
    this.postService.deletePost(id).subscribe({
      next: ()=>{
        this.posts = this.posts.filter(p => p.id !== id);
        this.selectedPost = null;
      },
      error: (err)=> {
        console.error("Unable to delete post: ", err);
      }
    });
  }

  onPostCreated(newPost: PostModel) {
    this.posts.unshift(newPost); 
  }
}

