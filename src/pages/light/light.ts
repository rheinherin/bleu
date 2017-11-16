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
  imgSrc:string="../assets/imgs/off.svg";

  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: Boolean;

  constructor(private bluetoothSerial: BluetoothSerial, private alertCtrl: AlertController) {
    bluetoothSerial.enable();

  }
  // constructor(private bluetoothSerial: BluetoothSerial) { }

  ionViewDidLoad() {

  }

  getTF() {
    let that = this;
    if(this.light) {

      this.lightOn();
      this.imgSrc = "../assets/imgs/on.svg";
    }
    else{
      this.lightOff();
      this.imgSrc = "../assets/imgs/off.svg";
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

  startScanning() {
    this.pairedDevices = null;
    this.unpairedDevices = null;
    this.gettingDevices = true;
    this.bluetoothSerial.discoverUnpaired().then((success) => {
      this.unpairedDevices = success;
      this.gettingDevices = false;
      success.forEach(element => {
        // alert(element.name);
      });
    },
      (err) => {
        console.log(err);
      })

    this.bluetoothSerial.list().then((success) => {
      this.pairedDevices = success;
    },
      (err) => {

      })
  }
  success = (data) => alert(data);
  fail = (error) => alert(error);

  selectDevice(address: any) {

    let alert = this.alertCtrl.create({
      title: 'Connect',
      message: 'Do you want to connect with?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Connect',
          handler: () => {
            this.bluetoothSerial.connect(address).subscribe(this.success, this.fail);
          }
        }
      ]
    });
    alert.present();

  }

  disconnect() {
    let alert = this.alertCtrl.create({
      title: 'Disconnect?',
      message: 'Do you want to Disconnect?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Disconnect',
          handler: () => {
            this.bluetoothSerial.disconnect();
          }
        }
      ]
    });
    alert.present();
  }

}
