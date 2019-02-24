import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from '../../app.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TweetModel} from '../../app.model';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription;
  public tweet = new TweetModel();

  constructor(private appService: AppService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.routeSubscription = this.activeRoute.params.subscribe(params => {
      this.appService.getTweet(params.slug).then((tweet) => {
        this.tweet = tweet;
      });
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
