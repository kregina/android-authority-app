import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { FeedProvider } from '../../providers/feed/feed';

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
    public _feedProvider: FeedProvider) {
   // this.isAndroid = platform.is('android');
  }

  ionViewDidLoad(){
    this.list = this._feedProvider.getFeed(); 
  }
  
  showDetail(page, param){
    this.navCtrl.push(page, { item: param })
  }
}
