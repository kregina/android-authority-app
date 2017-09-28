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
    .map(res => res.text())
    .map(this.parseString);
  }

  parseString(text: string): Post[]{
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(text, "text/xml");
    var items = xmlDoc.getElementsByTagName("item");
    var posts = [];
    console.log('Items', items);

    for(var i = 0; i < items.length; i++){
      var post = new Post();
      post.title = items[i].getElementsByTagName('title')[0].childNodes[0].nodeValue;
      post.link = items[i].getElementsByTagName('link')[0].childNodes[0].nodeValue;;
      //post.categories = items[i]['category'].map(node => node.nodeValue);
      post.description = items[i].getElementsByTagName('description')[0].childNodes[0].nodeValue;
      post.content = items[i].getElementsByTagName('content:encoded')[0].childNodes[0].nodeValue;
      post.thumbnail = items[i].getElementsByTagName('media:content')[0].getAttribute('url');
     posts.push(post);
    }

    console.log('Posts', posts);
    return posts;
  }
}

export class Post{
  public title: string;
  public link: string;
  public pubDate: Date;
  public categories: Array<string>;
  public description: string;
  public content: string;
  public thumbnail;
}

