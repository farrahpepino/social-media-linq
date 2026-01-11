import { Component } from '@angular/core';
import { Navbar } from '../../Navbar/navbar/navbar';
import { PostButton } from '../../Shared/post-button/post-button';

@Component({
  selector: 'app-home',
  imports: [Navbar, PostButton],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
