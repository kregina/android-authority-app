import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { FeedProvider } from '../../providers/feed/feed';
import 'rxjs/add/operator/finally'; 
import { FavoritesProvider } from '../../providers/favorites/favorites';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  segment: string = "all";
  posts;
  favorites;
  
  constructor(
    public navCtrl: NavController, 
    public loading: LoadingController,
    public _feedProvider: FeedProvider,
    public _favoritesProvider: FavoritesProvider) {
    }
    
    ionViewDidLoad(){
      var loader = this.loading.create();
      this.posts = this._feedProvider.getFeed(this.segment)
      .finally(() => loader.dismiss());
    }
    
    showDetail(page, param){
      this.navCtrl.push(page, { post: param })
    }
    
    doRefresh(refresher) {
      this.posts = this._feedProvider.getFeed()
      .finally(() => refresher.complete()); 
    }
    
    addFavorite(post){
      this._favoritesProvider.addFavorites(post);
    }

    removeFavorite(post){
      this._favoritesProvider.removeFavorites(post)
      .then(() => this.posts = this._feedProvider.getFeed(this.segment));
    }

    isFavorite(post){
      return this._favoritesProvider.hasFavorite(post);
    }

    updateFeed(segment){
      var loader = this.loading.create();
      this.posts = this._feedProvider.getFeed(segment)
      .finally(() => loader.dismiss());
    }
    
  }
  