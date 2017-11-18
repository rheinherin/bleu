import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from "../../providers/data/data";

@Component({
  selector: 'page-rec',
  templateUrl: 'records.html'
})
export class RecPage {
  public localData: number;
  Kcal: string;
  Time: string;


  constructor(public navCtrl: NavController, public data:DataProvider) {
    this.localData = this.data.paramData;
  }
  ionViewDidEnter() {
    this.localData = this.data.paramData;
    this.Time = (this.localData/3600).toFixed(2);
    this.Kcal = (this.localData/3600*200).toFixed(2);
  }

}
