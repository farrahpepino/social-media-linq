import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../Services/auth-service';
import { PostService } from '../../../Services/post-service';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { PostModel } from '../../../Models/PostModel';
import { User } from '../../../Models/User';

@Component({
  selector: 'app-post',
  imports: [CommonModule],
  templateUrl: './post.html',
  styleUrl: './post.css'
})

export class Post implements OnInit, OnDestroy {
  showForm = false;
  today: Date = new Date();
  authorId: string = '';
  user: User | null = null;

  private timerId!: any;

  @Output() postCreated = new EventEmitter<PostModel>();

  @ViewChild('postInput') postInput!: ElementRef<HTMLElement>; // medium article

  constructor (private auth: AuthService, private postService: PostService) {}
  ngOnInit() {
    this.updateTime();
  }

  ngOnDestroy() {
    clearTimeout(this.timerId);
  }

  private updateTime() {
    this.today = new Date();

    const now = new Date();
    const delay = 3000 - (now.getTime() % 3000);

    this.timerId = setTimeout(() => this.updateTime(), delay);
  }
  
  toggleForm() {
    this.showForm = !this.showForm;
  }
  
  submitPost() {
    const content = this.postInput.nativeElement.innerText.trim();

    this.auth.getProfile().subscribe({
      next: (res) => {
  
        this.user = res;
        this.postService.submitPost({
          authorId: res.id!,
          content: content
        }).subscribe({
          next: (res) => {
            this.postCreated.emit(res);
            this.toggleForm();            
            this.postInput.nativeElement.innerText = '';
          },
          error: (err) => {
            console.error("Unable to post", err)
          }
        })
      },
      error: (err) => {
        console.error("Unable to fetch profile.", err)
      }
    });
  }
}
