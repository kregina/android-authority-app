import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { FavoritesProvider } from '../favorites/favorites';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do'; 
import { FEED_URL } from '../../app/app.config';

/*
Generated class for the FeedProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/

@Injectable()
export class FeedProvider {
  
  constructor(
    public http: Http,
    public _favoritesProvider: FavoritesProvider,
    @Inject(FEED_URL) public feedUrl: string) {
    }
    
    getFeed(segment = 'all'){
      if(segment == 'favorites'){
        var posts = Object.keys(this._favoritesProvider.postsLookup)
        .map(key => this._favoritesProvider.postsLookup[key]);
        return Observable.of(posts);
      }else{
        return this.http.get(this.feedUrl)
        .map(res => res.text())
        .map(this.parseString);
      }
    }
    
    parseString(text: string): Post[]{
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(text, "text/xml");
      var items = xmlDoc.getElementsByTagName("item");
      var posts = [];
      console.log('items', items);
      for(var i = 0; i < items.length; i++){
        var post = new Post();
        post.guid = items[i].getElementsByTagName('guid')[0].childNodes[0].nodeValue;
        post.pubDate = new Date(items[i].getElementsByTagName('pubDate')[0].childNodes[0].nodeValue);
        post.title = items[i].getElementsByTagName('title')[0].childNodes[0].nodeValue;
        post.link = items[i].getElementsByTagName('link')[0].childNodes[0].nodeValue;
        post.categories = Array.prototype.map.call(items[i].getElementsByTagName('category'), category => category.childNodes[0].nodeValue);
        post.description = items[i].getElementsByTagName('description')[0].childNodes[0].nodeValue;
        post.content = items[i].getElementsByTagName('content:encoded')[0].childNodes[0].nodeValue;
        post.thumbnail = items[i].getElementsByTagName('media:content')[0].getAttribute('url');
        post.creator = items[i].getElementsByTagName('dc:creator')[0].childNodes[0].nodeValue;
        posts.push(post);
      }
      console.log('posts', posts)
      return posts;
    }
  }
  
  export class Post{
    public guid: string;
    public title: string;
    public link: string;
    public pubDate: Date;
    public categories: Array<string>;
    public description: string;
    public content: string;
    public thumbnail;
    public creator;
  }
  
  