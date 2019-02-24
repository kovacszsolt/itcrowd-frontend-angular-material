import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main/main.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AppService} from '../app.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {AppServiceRemote} from '../app.service.remote';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {TweetComponent} from './tweet/tweet.component';
import {ListComponent} from './list/list.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    MainComponent,
    TweetComponent,
    ListComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatToolbarModule,
    ScrollingModule,
    MatCardModule,
    MatButtonModule,
    MatRippleModule
  ],
  providers: [
    AppServiceRemote,
    AppService
  ]
})
export class MainModule {
}
