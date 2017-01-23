import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';

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
 Generated class for the roomInfoMap page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
declare var google;
@Component({
  selector: 'page-build-case-map',
  templateUrl: 'room-map.html'
})
export class RoomMapPage {

  map: any;
  test: string;
  result: string;
  Map: any;
  address: string;

  constructor(public navCtrl: NavController, public platform: Platform, public params: NavParams) {
    platform.ready().then(() => {
      this.address = params.get("address");

      if (isCordovaAvailable()) {
        this.loadMap(this.address);
      }
    });
  }

  /**
   *
   * @param address marker를 추가하기 위한 주소를 입력 받음.
   * 17.01.19 몇개의 파라미터 추가하고 업데이트 할 예정.
   * 위도, 경도, title까지 전부다 받아와야 함.
   *
   * 실제 지도를 띄우는 부분.
   */
  loadMap(address) {
    // make sure to create following structure in your view.html file
    // <ion-content>
    //  <div #map id="map"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('roomInfoMap');

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
        title: address
      };

      this.map.addMarker(markerOptions)
        .then((marker: GoogleMapsMarker) => {
          marker.showInfoWindow();
        });
    });


  }

}
