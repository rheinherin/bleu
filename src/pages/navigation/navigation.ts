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

    startNavigating(){
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
          console.log(document.getElementsByClassName('adp-stepicon')[0].getElementsByTagName('div')[0].className);
          var temp = document.getElementsByClassName('adp-stepicon')[0].getElementsByTagName('div')[0].className;

          if (temp == 'adp-maneuver') {
            console.log ("No SIGN");
            that.sign = "no";
            console.log(that.sign);
            that.sign = '';
          }
          else if (temp == 'adp-turn-left adp-maneuver' || 'adp-turn-slight-left adp-maneuver') {
            console.log ("left");
            that.sign = "left";
            console.log(that.sign);
            that.sign = '';
          }
          else if (temp == 'adp-turn-right adp-maneuver' || 'adp-turn-slight-right adp-maneuver') {
            console.log ("right");
            that.sign = "right";
            console.log(that.sign);
            that.sign = '';
          }
        }, 500);

        // console.log(this.directionsPanel.nativeElement);
        // setTimeout(this.console(), 60000);


        this.Str = position.coords.latitude+", "+position.coords.longitude;

        directionsService.route({
            origin: '37.77, -122.447',
            destination: '37.768, -122.511',
            travelMode: google.maps.TravelMode['DRIVING']
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
  this.startNavigating();
  if (this.sign == "no") {
    this.goStraight();
  }
  else if (this.sign == "left") {
    this.goLeft();
  }
  else if (this.sign == "right") {
    this.goRight();
  }
  setInterval(function (this) {
    that.startNavigating();

    console.log(this.sign);
    if (this.sign == "no") {
      that.goStraight();
    }
    else if (this.sign == "left") {
      that.goLeft();
    }
    else if (this.sign == "right") {
      that.goRight();
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

}
