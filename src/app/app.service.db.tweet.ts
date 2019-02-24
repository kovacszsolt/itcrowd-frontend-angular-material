import {Injectable} from '@angular/core';
import {AppServiceDB} from './app.service.db';
import {environment} from '../environments/environment';
import {TweetModel} from './app.model';

@Injectable()
export class AppServiceDBTweet extends AppServiceDB {
  constructor() {
    super(environment.databaseTweet);
  }

  public getTweet(slug): Promise<TweetModel> {
    return new Promise((resolve, reject) => {
      this._dbPromise.then((db: any) => {
        const tx = db.transaction(this.databaseData.tableName);
        tx.objectStore(this.databaseData.tableName).index('slug').get(slug).then((tweet) => {
          resolve(tweet);
        });
      });
    });
  }
}
