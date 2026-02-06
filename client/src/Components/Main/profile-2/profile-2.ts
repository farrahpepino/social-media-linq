import { Component } from '@angular/core';
import { Post } from '../../Shared/post/post';
import { PostModel } from '../../../Models/PostModel';
import { PostService } from '../../../Services/post-service';

@Component({
  selector: 'app-profile-2',
  imports: [Post],
  templateUrl: './profile-2.html',
  styleUrl: './profile-2.css',
})
export class Profile2 {
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
