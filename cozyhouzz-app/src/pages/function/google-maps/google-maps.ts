import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapsLatLng,
  CameraPosition,
  GoogleMapsMarkerOptions,
  GoogleMapsMarker, Geocoder, Geolocation
} from 'ionic-native';
import {isCordovaAvailable} from '../../../services/is-cordova-available';

/*
 Generated class for the GoogleMaps page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
declare var google;
@Component({
  selector: 'page-google-maps',
  templateUrl: 'google-maps.html'
})
export class GoogleMapsPage {
  map: any;
  test:string;
  result:string;
  Map:any;
  constructor(public navCtrl: NavController, public platform: Platform) {
    platform.ready().then(() => {

    });
  }

  ionViewDidLoad() {
    if (!isCordovaAvailable()) {
      return false;
    }
    this.loadMap();
  }

  loadMap() {
    // make sure to create following structure in your view.html file
    // <ion-content>
    //  <div #map id="map"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');
    let input_element: HTMLElement = document.getElementById('pac-input');

    this.map = new GoogleMap(element);
    // controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // listen to MAP_READY event
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map is ready!');
      // create LatLng object

      let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(35.8441820, 127.1292780);


      // create CameraPosition
      let position: CameraPosition = {
        target: ionic,
        zoom: 14
      };

      // move the map's camera to position
      this.map.moveCamera(position);

      // create new marker
      let markerOptions: GoogleMapsMarkerOptions = {
        position: ionic,
        title: 'Ionic'
      };

      this.map.addMarker(markerOptions)
        .then((marker: GoogleMapsMarker) => {
          marker.showInfoWindow();
        });
    });


  }

  getUserLocation() {
    Geocoder.geocode({address:this.test}).then(result => {
      this.result = JSON.stringify(result[0].extra);

      // create new marker
      let markerOptions: GoogleMapsMarkerOptions = {
        position: result[0].position,
        title: result[0].extra.featureName
      };

      let position: CameraPosition = {
        target: result[0].position,
        zoom: 14
      };

      this.map.moveCamera(position);
      this.map.addMarker(markerOptions)
        .then((marker: GoogleMapsMarker) => {
          marker.showInfoWindow();
        });
    });
    // Определяем текущие координаты
    /*
    this.platform.ready().then(() => {
      Geolocation.getCurrentPosition({timeout: 3000}).then(
        (resp) => {
          let req = {
            position: {
              lat: resp.coords.latitude,
              lng: resp.coords.longitude
            }
          };
          // Определяем название города
          Geocoder.geocode(req).then(
            (res) => {
              // do something
            }
          );
        },
        (err) => {
        }
      );
    });*/

  }


}
