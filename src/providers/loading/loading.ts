import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoadingProvider {

  public loader;
  private _tasks = 0;

  constructor(public loadingCtrl: LoadingController) {

  }

  get isActive():boolean {
    return this._tasks > 0;
  }

  show(caller?: string) {
    if(!this.isActive){
      this.loader = this.loadingCtrl.create();
      this.loader.present();
    }
    this._tasks++;
  }

  hide(caller?: string){
    if(this.isActive){
      if(this._tasks == 1){
        this.loader.dismiss();
      }
      this._tasks--;
    }
    else {
      console.error("Erro: tentou esconder o loading sem ele estar ativo.") 
    }
  }

}
