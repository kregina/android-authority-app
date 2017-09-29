import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FeedProvider } from '../../providers/feed/feed';
import 'rxjs/add/operator/finally'; 
import { FavoritesProvider } from '../../providers/favorites/favorites';
import { LoadingProvider } from '../../providers/loading/loading';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  segment: string = "all";
  posts;
  constructor(
    public navCtrl: NavController, 
    public loading: LoadingProvider,
    public _feedProvider: FeedProvider,
    public _favoritesProvider: FavoritesProvider) {
    }
    
    ionViewDidLoad(){
      this.loading.show();
      this.posts = this._feedProvider.getFeed(this.segment)
      .finally(() => this.loading.hide());
    }
    
    showDetail(page, param){
      this.loading.show();
      this.navCtrl.push(page, { post: param })
      .then(() => this.loading.hide());
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
      this.loading.show();
      this.posts = this._feedProvider.getFeed(segment)
      .finally(() => this.loading.hide());
    }
    
  }
  