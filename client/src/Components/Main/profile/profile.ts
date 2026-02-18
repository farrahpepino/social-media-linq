import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../Navbar/navbar/navbar';
import { Post } from '../../Shared/post/post';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../Services/post-service';
import { PostModel } from '../../../Models/PostModel';
import { User } from '../../../Models/User';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../Services/user-service';
import { AuthService } from '../../../Services/auth-service';
import { P } from '@angular/cdk/keycodes';

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
  loggedIn: User | null = null;
  followStatus: boolean = false;
  following: User[] | null = null;
  followers: User[] | null = null;


  constructor(private postService: PostService, private aRoute: ActivatedRoute, private userService: UserService, private auth: AuthService) {}

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
            this.userService.getFollowStatus(res.id!).subscribe({
              next: (status) => {this.followStatus = status},
              error: (err) => console.error("Unable to fetch follow status", err)
            });
          },
          error: (err) => {
            console.error("Unable to fetch posts:", err);
          }
        });
        this.userService.getFollowers(res.id!).subscribe({
          next: (res) => {
            this.followers = res;
          }
        });
        this.userService.getFollowing(res.id!).subscribe({
          next: (res) => {
            this.following = res;
          }
        });
      },
      error: (err) => {
        console.error("Unable to get user's data", err);
      }

    });

    this.auth.getProfile().subscribe({
      next: (res)=> {
        this.loggedIn = res;
      },
      error: (err) => {
        console.error("Unable to fetch user's data ", err);
      }
    });

  }

  toggleFollow() {  
    if (!this.loggedIn?.id) return;
    if (!this.user?.id) return;
  
    if (this.followStatus==false){
      this.userService.followUser(this.user.id).subscribe({
        error: err => console.error(err)
      });
      return;
    }

    this.followStatus=false;
    this.userService.unfollowUser(this.user.id).subscribe({
      error: err => console.error(err)
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

