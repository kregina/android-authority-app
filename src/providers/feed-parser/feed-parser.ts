import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the FeedParserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FeedParserProvider {

  constructor(public http: Http) {
    console.log('Hello FeedParserProvider Provider');
  }

  parseString(text: string){
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(text, "text/xml");
    var items = xmlDoc.getElementsByTagName("item");
    var posts = [];

    for(var i = 0; i < items.length; i++){
      var post = new Post();
      post.title = items[i]['title'];
      post.link = items[i]['link'];
      post.categories = items[i]['description'];
      post.description = items[i]['description'];
      post.content = items[i]['content'];
      post.thumbnail = items[i]['thumbnail'];
    }
  }
}

export class Post{
  public title: string;
  public link: string;
  public pubDate: Date;
  public categories: Array<string>;
  public description: string;
  public content: string;
  public thumbnail: string;
}