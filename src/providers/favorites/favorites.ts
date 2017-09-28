import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Post } from '../feed/feed';

/*
  Generated class for the FavoritesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoritesProvider {
   postsLookup: {};

  constructor(public http: Http, private storage: Storage) {
    console.log('Hello FavoritesProvider Provider');
  }

  addFavorites(post: Post){
    this.postsLookup[post.guid] = post;
    return this.save();
  }

  removeFavorites(post: Post){
    delete this.postsLookup[post.guid];
    return this.save();
  }

  save(){
    return this.storage.set('posts', this.postsLookup);
  }

  load(){
    return this.storage.get('posts')
    .then(res => this.postsLookup = res || {});
  }

  hasFavorite(post){
    return this.postsLookup.hasOwnProperty(post.guid);
  }
}
