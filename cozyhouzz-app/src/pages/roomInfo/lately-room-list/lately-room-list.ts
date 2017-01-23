import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the LatelyroomInfoList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-lately-build-case-list',
  templateUrl: 'lately-room-list.html'
})
export class LatelyRoomListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LatelyRoomListPage');
  }

  ionViewWillEnter() {
  }
}
