import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AlertController } from 'ionic-angular';

// let that = this;
// declare var macAddress:any = "00:00:AA:BB:CC:DD";

@Component({
  selector: 'page-light',
  templateUrl: 'light.html'
})
export class LightPage {
  Number: any;
  light:Boolean;
  imgSrc:string="assets/imgs/off.svg";
  Status: any;
  OnOff: string="Off";

  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: Boolean;

  constructor(private bluetoothSerial: BluetoothSerial, private alertCtrl: AlertController) {
    bluetoothSerial.enable();

  }
  // constructor(private bluetoothSerial: BluetoothSerial) { }

  ionViewDidLoad() {

  }

  ionViewDidEnter(this) {
    this.bluetoothSerial.write('r', this.success, this.fail);//ask arduino to rtn status -- 'r' to rtn light data / 'R' to rtn lock data
    this.Status = this.bluetoothSerial.read(this.readsuccess, this.readfail);//get status
    console.log(this.Status);


  }
  afterRead() {
    if(this.Status == '1') {
      this.initOn();
      this.OnOff = this.Status;
    }
    else if (this.Status == '0') {
      this.initOff();
      this.OnOff = this.Status;
    }

  }

  readsuccess = (data) => this.afterRead();
  readfail = (error) => console.log("err");


  getTF() {
    let that = this;
    if(this.light) {

      this.lightOn();
      this.imgSrc = "assets/imgs/on.svg";
      this.OnOff = "On";
    }
    else{
      this.lightOff();
      this.imgSrc = "assets/imgs/off.svg";
      this.OnOff = "Off";
    }
  }

  sendDataBT(this) {
    console.log(this.Number);//getdata
    this.bluetoothSerial.write(this.Number, this.success, this.fail);
    console.log("success");

    // that.bluetoothSerial.write(this.Number, success, failure);//send data

  }

  lightOn(this) {
    this.bluetoothSerial.write('l', this.success, this.fail);
    console.log("success1");

  }
  lightOff(this) {
    this.bluetoothSerial.write('m', this.success, this.fail);
    console.log("success2");

  }
  initOn() {
    this.imgSrc = "assets/imgs/on.svg";
  }
  initOff() {
    this.imgSrc = "assets/imgs/off.svg";
  }


  success = (data) => console.log("success");
  fail = (error) => console.log("err");


}
