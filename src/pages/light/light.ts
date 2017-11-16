import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-light',
  templateUrl: 'light.html'
})
export class LightPage {
  Number: any;

  constructor(public navCtrl: NavController) {

  }
  ionViewDidLoad() {

  }

  sendDataBT() {
    console.log(this.Number);//getdata
  }

}
