import {Injectable} from '@angular/core';
import {AppServiceDB} from './app.service.db';
import {environment} from '../environments/environment';
import {TweetModel} from './app.model';

@Injectable()
export class AppServiceDBTag extends AppServiceDB {
  constructor() {
    super(environment.databaseTag);
  }

  public getTag(slug): Promise<TweetModel[]> {
    return new Promise((resolve, reject) => {
      this._dbPromise.then((db: any) => {
        const tx = db.transaction(this.databaseData.tableName);
        tx.objectStore(this.databaseData.tableName).index('tag').getAll(slug).then((tweet) => {
          resolve(tweet);
        });
      });
    });
  }

}
