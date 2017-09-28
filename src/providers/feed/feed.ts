import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do'; 
import * as xml2js from "xml2js"
/*
Generated class for the FeedProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/

@Injectable()
export class FeedProvider {
  
  constructor(public http: Http) {
    console.log('Hello FeedProvider Provider');
  }
  
  getFeed(){
    return this.http.get("/feed")
    .do(res => console.log('res', res))
    .map(data => {
      var res;
      xml2js.parseString(data.text(), function (err, result) {
        res = result;
      });
      var content = res.rss.channel[0].item;
      console.log('content', content);
      return content;
    });
  }
}
