import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  imports: [CommonModule],
  templateUrl: './post.html',
  styleUrl: './post.css'
})

export class Post implements OnInit, OnDestroy {
  showForm = false;
  today: Date = new Date();
  private timerId!: any;

  ngOnInit() {
    this.timerId = setInterval(() => {
      this.today = new Date();
    }, 60000); 
  }

  ngOnDestroy() {
    clearInterval(this.timerId);
  }
  
  toggleForm() {
    this.showForm = !this.showForm;
  }
  
}
