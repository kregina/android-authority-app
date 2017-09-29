import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/finally'; 
import { ToastProvider } from '../../providers/toast/toast';
import { LoadingProvider } from '../../providers/loading/loading';
import { FavoritesProvider } from '../../providers/favorites/favorites';
/**
* Generated class for the DetailPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage({
  name: 'Detail'
})
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  post;
  isCordova: boolean;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loading: LoadingProvider,
    private socialSharing: SocialSharing,
    public _toastProvider: ToastProvider,
    public _favoritesProvider: FavoritesProvider,
    public platform: Platform) {
      this.isCordova = platform.is('cordova');
    }
    
    ngOnInit() {
      this.loading.show();
      this.post = this.navParams.get('post');
      this.loading.hide();
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
    
    shareViaFacebook(message, image, url){
      if(this.isCordova && this.platform.ready){
        this.socialSharing.shareViaFacebook(message, image, url).then(() => {
          console.log('shareFacebook', message, image, url)
          this._toastProvider.show('The post has been shared!', 3000);
        }).catch(() => {
          this._toastProvider.show('Error has ocorred!', 3000);
        });
      }else{
        this._toastProvider.show('Platform is not cordova!', 3000);
      }
    }
    
    shareViaTwitter(message, image, url){
      if(this.isCordova && this.platform.ready){
        this.socialSharing.shareViaTwitter(message, image, url).then(() => {
          this._toastProvider.show('The post has been shared!', 3000);
        }).catch(() => {
          this._toastProvider.show('Error has ocorred!', 3000);
        });
      }else{
        this._toastProvider.show('Platform is not cordova!', 3000);
      }
    }
    
    shareViaWhatsApp(message, image, url){
      if(this.isCordova && this.platform.ready){
        this.socialSharing.shareViaWhatsApp(message, image, url).then(() => {
          this._toastProvider.show('The post has been shared!', 3000);
        }).catch(() => {
          this._toastProvider.show('Error has ocorred!', 3000);
        });
      }else{
        this._toastProvider.show('Platform is not cordova!', 3000);
      }
    }
  }
  