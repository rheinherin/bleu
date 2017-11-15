import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
declare var google;

declare var google: any;

@Component({
  selector: 'page-nav',
  templateUrl: 'navigation.html'
})
export class NavPage {
  Destination: any = '';
  MyLocation: any;

  @ViewChild('map') mapRef: ElementRef;
  // map: any;


  constructor(public navCtrl: NavController) {

  }
  ionViewDidLoad() {
    this.showMap();
    console.log(this.mapRef);
  }

  showMap() {
    //location - lat long
    const location = new google.maps.LatLng(51.507351, -0.127758)

    //map oprions
    const options = {
      center: location,
      zoon: 15,
      streetViewControl: false,
      mapTypeId: 'roadmap'
  }

  const map = new google.maps.Map(this.mapRef.nativeElement, options);
  console.log("SHOWED");



  this.addMarker(location, map);
  }

  addMarker(position, map) {
    return new google.maps.Marker({
      position,
      map
    });

  }



  calculateAndDisplayRoute() {
        let that = this;
        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: 41.85, lng: -87.65}
        });
        directionsDisplay.setMap(map);


        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            map.setCenter(pos);
            that.MyLocation = new google.maps.LatLng(pos);

          }, function() {
          });
        } else {
          // Browser doesn't support Geolocation
        }

        directionsService.route({
          origin: this.MyLocation,
          destination: this.Destination,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

}
