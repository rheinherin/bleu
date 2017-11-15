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
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    let that = this;
    // this.showMap();
    console.log(this.mapRef);

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

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15
    });
    directionsDisplay.setMap(map);
    const marker = new google.maps.Marker({
      position: that.MyLocation,
      map: map,
      title:"Hello World!"
    });

    // To add the marker to the map, call setMap();
    marker.setMap(map);
  }

  showMap() {
    //location - lat long
    const location = new google.maps.LatLng(51.507351, -0.127758)
    const centerLatLng = new google.maps.LatLng(51.507351, 0.127758);

    //map oprions
    const options = {
      center: centerLatLng,
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
          zoom: 15,
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
            console.log(that.MyLocation);
            console.log(that.Destination);
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

}
