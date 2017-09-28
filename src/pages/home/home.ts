import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { FeedProvider } from '../../providers/feed/feed';
import 'rxjs/add/operator/finally'; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  feed: string = "all";
  isAndroid: boolean = false;
  list;
  
  constructor(
    public navCtrl: NavController, 
    platform: Platform, 
    public loading: LoadingController,
    public _feedProvider: FeedProvider) {
      // this.isAndroid = platform.is('android');
    }
    
    ionViewDidLoad(){
      var loader = this.loading.create();
      this.list = this._feedProvider.getFeed()
      .finally(() => loader.dismiss());
    }
    
    showDetail(page, param){
      this.navCtrl.push(page, { item: param })
    }
    
    doRefresh(refresher) {
      this.list = this._feedProvider.getFeed()
      .finally(() => refresher.complete()); 
    }
    
  }
  