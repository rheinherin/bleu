import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-lock',
  templateUrl: 'lock.html'
})
export class LockPage {
  Number: any;
  lock:Boolean;

  imgSrc:string="assets/imgs/off.svg";
  Status: string ="";
  OnOff: string="Unlocked";

  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: Boolean;

  constructor(private bluetoothSerial: BluetoothSerial, private alertCtrl: AlertController) {
    bluetoothSerial.enable();
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter(this) {
    this.bluetoothSerial.write('R', this.success, this.fail);//ask arduino to rtn status -- 'r' to rtn light data / 'R' to rtn lock data
    this.bluetoothSerial.read(this.readsuccess, this.readfail);//get status

  }
  afterRead(data) {

    if(data == '1') {
      this.OnOff = this.Status;
      this.initOn();
    }
    else if (data == '0') {
      this.OnOff = this.Status;
      this.initOff();
    }

  }

  readsuccess = (data) => {this.afterRead(data);}
  readfail = (error) => console.log("err");

  getTF() {
    let that = this;
    if(this.lock) {

      this.lockOn();
      this.imgSrc = "assets/imgs/on.svg";
      this.OnOff = "Locked";
    }
    else{
      this.lockOff();
      this.imgSrc = "assets/imgs/off.svg";
      this.OnOff = "Unlocked";
    }
  }

  sendDataBT(this) {
    console.log(this.Number);//getdata
    this.bluetoothSerial.write(this.Number, this.success, this.fail);
    console.log("success");

    // that.bluetoothSerial.write(this.Number, success, failure);//send data

  }

  lockOn(this) {
    this.bluetoothSerial.write('0', this.success, this.fail);
    console.log("success");
  }
  lockOff(this) {
    this.bluetoothSerial.write('1', this.success, this.fail);
    console.log("success");
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
