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
  
}
