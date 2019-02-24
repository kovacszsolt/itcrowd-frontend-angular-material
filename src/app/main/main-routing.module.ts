import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {TweetComponent} from './tweet/tweet.component';
import {ListComponent} from './list/list.component';
import {AboutComponent} from './about/about.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          type: 'front'
        }
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: ':slug',
        component: TweetComponent
      },
      {
        path: 'tag/:tag',
        component: ListComponent,
        data: {
          type: 'tag'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
