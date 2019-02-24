import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AppServiceRemote {


  constructor(private http: HttpClient) {
  }

  public getTweets(): Promise<any[]> {
    return this.http.get<any[]>('https://itnews.cloud/backend/list').toPromise().then((tweetList) => {
      return tweetList;
    });
  }
}
