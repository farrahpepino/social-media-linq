import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  imports: [MatProgressSpinnerModule],
  template: 
  `
  <div>

    <mat-spinner
      mode="indeterminate"
      [diameter]="50"
      class="white-spinner"
      >
    </mat-spinner>

  </div>
  
  `,
  styleUrls: ["./loading.css", "./loading.scss"]
})

export class Loading {

}
