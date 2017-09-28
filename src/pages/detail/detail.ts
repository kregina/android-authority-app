import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
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
    public loading: LoadingController) {
    }
    
    ngOnInit() {
      var loader = this.loading.create();
      this.post = this.navParams.get('post');
      loader.dismiss();
    }
    
  }
  