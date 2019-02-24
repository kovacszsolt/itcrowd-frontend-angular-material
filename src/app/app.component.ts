import {Component} from '@angular/core';
import {AppService} from './app.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public loading = true;

  constructor(private appService: AppService, private snackBar: MatSnackBar) {
    this.appService.initData().then((a) => {
      this.loading = false;
    });
  }
}
