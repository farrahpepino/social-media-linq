import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../Navbar/navbar/navbar';
import { Post } from '../../Shared/post/post';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../Services/post-service';
import { PostModel } from '../../../Models/PostModel';

@Component({
  selector: 'app-profile-2',
  imports: [Post, CommonModule, Navbar],
  templateUrl: './profile-2.html',
  styleUrl: './profile-2.css',
})
export class Profile2 implements OnInit {
  posts: PostModel[] = [];
  selectedPost: string | null = null;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.posts$.subscribe(posts => {
      this.posts = posts;
    });

    this.postService.getFeed('change-this').subscribe();
  }

  showDropdown(id: string){
    this.selectedPost = this.selectedPost === id ? null : id;
  }

  deletePost(id: string) {
    this.postService.deletePost(id).subscribe({
      next: ()=>{
        this.selectedPost = null;
      },
      error: (err)=> {
        console.error("Unable to delete post: ", err);
      }
    });
  }

}
