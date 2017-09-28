import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/finally'; 
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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loading: LoadingController,
    private socialSharing: SocialSharing,
    public toastCtrl: ToastController) {
    }
    
    ngOnInit() {
      var loader = this.loading.create();
      this.post = this.navParams.get('post');
      loader.dismiss();
    }

    shareViaFacebook(message, image, url){
      this.socialSharing.shareViaFacebook(message, image, url).then(() => {
        let toast = this.toastCtrl.create({
          message: 'The post has been shared!',
          duration: 3000
        });
        toast.present();
      }).catch(() => {
        let toast = this.toastCtrl.create({
          message: 'Error has ocorred!',
          duration: 3000
        });
      });
    }
    
    shareViaTwitter(message, image, url){
      this.socialSharing.shareViaTwitter(message, image, url).then(() => {
        let toast = this.toastCtrl.create({
          message: 'The post has been shared!',
          duration: 3000
        });
        toast.present();
      }).catch(() => {
        let toast = this.toastCtrl.create({
          message: 'Error has ocorred!',
          duration: 3000
        });
      });
    }

    shareViaWhatsApp(message, image, url){
      this.socialSharing.shareViaWhatsApp(message, image, url).then(() => {
        let toast = this.toastCtrl.create({
          message: 'The post has been shared!',
          duration: 3000
        });
        toast.present();
      }).catch(() => {
        let toast = this.toastCtrl.create({
          message: 'Error has ocorred!',
          duration: 3000
        });
      });
    }
  }
  