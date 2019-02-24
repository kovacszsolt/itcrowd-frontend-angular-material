import {Injectable} from '@angular/core';
import {AppServiceRemote} from './app.service.remote';
import {environment} from '../environments/environment';
import {TweetModel} from './app.model';
import {AppServiceDBTweet} from './app.service.db.tweet';
import {AppServiceDBTag} from './app.service.db.tag';

@Injectable()
export class AppService {


  constructor(private appServiceRemote: AppServiceRemote) {
  }

  public getTweetTag(tag): Promise<TweetModel[]> {
    const dbService = new AppServiceDBTag();
    return dbService.getTag(tag).then((tweetList) => {
      const data = [];
      tweetList.forEach((tweet) => {
        if (data.find(f => f.slug === tweet.slug) === undefined) {
          data.push(tweet);
        }
      });
      return data;
    });
  }

  public getTweet(slug): Promise<TweetModel> {
    const dbService = new AppServiceDBTweet();
    return dbService.getTweet(slug);
  }

  public getAllTweets(): Promise<any[]> {
    const dbService = new AppServiceDBTweet();
    return dbService.getAllData();
  }

  public getTweets(page): Promise<any[]> {
    const dbService = new AppServiceDBTweet();
    return dbService.getRange(environment.itemPerPage * (page - 1), environment.itemPerPage * (page));
  }

  public initData(): Promise<any> {
    return Promise.all(
      [
        this.initDataTweet(),
        this.initDataTag()
      ]
    );
  }

  public initDataTag(): Promise<any> {
    const dbService = new AppServiceDBTag();
    dbService.connectToIDB();
    return dbService.countData().then((countData) => {
      if (countData === 0) {
        return this.storeDataInTagDB(dbService).then((item) => {
          return (true);
        });
      } else {
        return (false);
      }
    });
  }


  public initDataTweet(): Promise<any> {
    const dbService = new AppServiceDBTweet();
    dbService.connectToIDB();
    return dbService.countData().then((countData) => {
      if (countData === 0) {
        return this.storeDataInDB(dbService).then((item) => {
          return (true);
        });
      } else {
        return (false);
      }
    });
  }

  private storeDataInDB(dbService) {
    return this.appServiceRemote.getTweets().then((data) => {
      data.forEach((tweet) => {
        dbService.addItems(tweet);
      });
      return data;
    });
  }

  private storeDataInTagDB(dbService) {
    return this.appServiceRemote.getTweets().then((data) => {
      data.forEach((tweet) => {
        dbService.addItems(tweet);
        const record = {...tweet};
        tweet.tags.forEach((tag) => {
          record.tag = tag;
          dbService.addItems(record);
        });
        return data;
      });
    });
  }
}
