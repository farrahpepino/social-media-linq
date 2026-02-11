import { Component } from '@angular/core';
import { User } from '../../../Models/User';
import { Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  @Input() users: User[] = [];
}
