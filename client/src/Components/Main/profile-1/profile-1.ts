import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../Navbar/navbar/navbar';
import { Post } from '../../Shared/post/post';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../Services/post-service';
import { PostModel } from '../../../Models/PostModel';

@Component({
  selector: 'app-profile-1',
  imports: [Navbar, Post, CommonModule],
  templateUrl: './profile-1.html',
  styleUrl: './profile-1.css',
})
export class Profile1 implements OnInit {
  posts: PostModel[] = [];
  selectedPost: string | null = null;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getFeed("change-this").subscribe({
      next: (res)=>{
        this.posts = res;
      },
      error: (err) => {
        console.error("Error fetching posts: ", err)
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

}
