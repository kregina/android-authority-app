import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the ToastProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastProvider {

  constructor(public toastCtrl: ToastController) {}

  show(message: string, duration: number){
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

}
