import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../Navbar/navbar/navbar';
import { Post } from '../../Shared/post/post';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../Services/post-service';
import { PostModel } from '../../../Models/PostModel';
@Component({
  selector: 'app-home',
  imports: [Navbar, Post, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  posts: PostModel[] = [];
  selectedPost: string | null = null;
  liked = false;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getFeed().subscribe({
      next: (res) => {
        this.posts = res;
      },
      error: (err) => {
        console.error("Unable to fetch posts:", err);
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

  toggleLike() {
    this.liked = !this.liked;
  }
}
