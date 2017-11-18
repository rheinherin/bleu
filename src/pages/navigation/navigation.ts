import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

declare var google;


// declare var google: any;
@Component({
  selector: 'page-nav',
  templateUrl: 'navigation.html'
})
export class NavPage {
  Destination: any = '';
  MyLocation: any;
  Str: string;
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  map: any;
  Sign: string = '';
  Length: number = 0;
  inner: any;
  // map: any;
  constructor(private bluetoothSerial: BluetoothSerial, public navCtrl: NavController, public geolocation: Geolocation) {
    bluetoothSerial.enable();
  }
  ionViewDidLoad() {
    this.loadMap();
    // this.startNavigating();
    }
  ionViewDidEnter() {
    this.loadMap();
  }

    loadMap(){
      this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.addMarker();

    }, (err) => {
      console.log(err);
    });


    }
    addMarker(){

        let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: this.map.getCenter()
        });

        let content = "<h4>Information!</h4>";

        this.addInfoWindow(marker, content);

      }
    addInfoWindow(marker, content){

        let infoWindow = new google.maps.InfoWindow({
          content: content
        });

        google.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(this.map, marker);
        });

      }

    startNavigating(num){
      this.inner = '';

        // let that = this;
        this.geolocation.getCurrentPosition().then((position) => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        console.log(position.coords.latitude+", "+position.coords.longitude);
        console.log(this.Destination);

        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(this.map);
        directionsDisplay.setPanel(this.directionsPanel.nativeElement);
        setTimeout(function () {
          let that = this;
          console.log(document.getElementsByClassName('adp-stepicon')[num].getElementsByTagName('div')[0].className);
          var temp = document.getElementsByClassName('adp-stepicon')[num].getElementsByTagName('div')[0].className.replace(" ", "").substring(9,17);
          console.log(temp);
          that.Sign = '';
          if (temp == "") {
            console.log("do nothing here!");
          }
          else if (temp == "ver") {
            console.log ("No SIGN");
            that.Sign = "no";
            console.log(that.Sign);

          }
          else if (temp == "rightadp") {
            console.log ("right");
            that.Sign = "right";
            console.log(that.Sign);

          }

          else if (temp == "leftadp-") {
            console.log ("left");
            that.Sign = "left";
            console.log(that.Sign);

          }
          else {

          }

        }, 600);

        // console.log(this.directionsPanel.nativeElement);
        // setTimeout(this.console(), 60000);


        this.Str = position.coords.latitude+", "+position.coords.longitude;

        directionsService.route({
            origin: '40.758557, -73.765437',
            destination: '40.769776, -73.839077',
            travelMode: google.maps.TravelMode['BICYCLING']
        }, (res, status) => {

            if(status == google.maps.DirectionsStatus.OK){
                directionsDisplay.setDirections(res);
                // console.log(res);
            } else {
                console.warn(status);
            }

        });
  }, (err) => {
    console.log(err);
  });
}
console() {
  // console.log(this.directionsPanel.nativeElement.getElementsByClassName('adp-stepicon'));
  console.log(this.directionsPanel.nativeElement.getElementsByClassName('adp-stepicon'));

  var temp = document.getElementsByClassName('adp-stepicon');
  // console.log(temp);
  // console.log(temp[0]);

}

startCycling(){
  let that = this;
  this.startNavigating(0);

  this.goStraight();

  setTimeout(function (this) {
    this.Length = document.getElementsByClassName('adp-stepicon').length;
    console.log(this.Length);
  }, 6000);

  var num = 1;

    var Interval = setInterval(function (this) {
      console.log(num);
      that.startNavigating(num);

      // console.log(this.Sign);
      if (this.Sign == "no") {
        that.goStraight();
      }
      else if (this.Sign == "left") {
        that.goLeft();
      }
      else if (this.Sign == "right") {
        that.goRight();
      }
      num++;

      if(num > this.Length){
       clearInterval(Interval);
       console.log("END");
       that.endNavigation();
      }
    }, 10000);

  }




success = (data) => {console.log("success");}
fail = (error) => console.log("err");
goStraight(this) {
  this.bluetoothSerial.write('a', this.success, this.fail);

}
goLeft(this) {
  this.bluetoothSerial.write('b', this.success, this.fail);

}
goRight(this) {
  this.bluetoothSerial.write('c', this.success, this.fail);


}

endNavigation(this) {
  this.bluetoothSerial.write('e', this.success, this.fail);


}

}
