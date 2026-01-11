import { Component } from '@angular/core';
import { Navbar } from '../../Navbar/navbar/navbar';
import { Post } from '../../Shared/post/post';

@Component({
  selector: 'app-home',
  imports: [Navbar, Post],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
