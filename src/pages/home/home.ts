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
  
  feed: string = "all";
  isAndroid: boolean = false;
  posts: Observable<any>;
  
  constructor(
    public navCtrl: NavController, 
    platform: Platform, 
    public loading: LoadingController,
    public _feedProvider: FeedProvider,
    public _favoritesProvider: FavoritesProvider) {
      // this.isAndroid = platform.is('android');
    }
    
    ionViewDidLoad(){
      var loader = this.loading.create();
      this.posts = this._feedProvider.getFeed()
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
      this._favoritesProvider.removeFavorites(post);
    }

    isFavorite(post){
      return this._favoritesProvider.hasFavorite(post);
    }
  }
  