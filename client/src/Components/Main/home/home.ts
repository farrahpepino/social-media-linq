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
  menu = false;
  posts: PostModel[] = [];
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

  showMenu(){
    this.menu = !this.menu;
  }

  deletePost(id: string) {
    this.postService.deletePost(id);
  }

}
