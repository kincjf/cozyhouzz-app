import { Component } from '@angular/core';
import {NavController, NavParams, MenuController} from 'ionic-angular';

/*
  Generated class for the UserInfoDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-info-detail',
  templateUrl: 'user-info-detail.html'
})
export class UserInfoDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {

    this.menu.close();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInfoDetailPage');
  }

}
