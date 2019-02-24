import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {AppService} from '../../app.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  public tweetList = [];
  public currentPage = 1;
  private data = '';
  routeSubscription: Subscription;

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.data === 'front') {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.currentPage++;
        this.getData();
      }
    }
  }

  constructor(
    private appService: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.data = this.activatedRoute.snapshot.data.type;
    switch (this.data) {
      case 'tag':
        this.ngOnInitTag();
        break;
      default:
        this.getData();
    }
  }

  private ngOnInitTag() {
    this.routeSubscription = this.activeRoute.params.subscribe(params => {
      this.appService.getTweetTag(params.tag).then((tweetList) => {
        console.log(tweetList);
        this.tweetList = tweetList;
      });
    });
  }

  getData() {
    this.appService.getTweets(this.currentPage).then((tweetList) => {
      tweetList.forEach((tweet) => {
        this.tweetList.push(tweet);
      });
    });
  }

  ngOnDestroy(): void {
    if (this.data === 'tag') {
      this.routeSubscription.unsubscribe();
    }
  }
}
