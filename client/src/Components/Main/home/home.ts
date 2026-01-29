import { Component } from '@angular/core';
import { Navbar } from '../../Navbar/navbar/navbar';
import { Post } from '../../Shared/post/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [Navbar, Post, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  menu = false;

  showMenu(){
    this.menu = !this.menu;
  }
}
