import { Component } from '@angular/core';
import {NavController, NavParams, MenuController, Events} from 'ionic-angular';
import {HomePage} from '../../../home/home';
import {UserService} from '../../../../services/user-service';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public events:Events,
  public userService:UserService) {

    this.menu.close();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInfoDetailPage');
  }

  logout() {
    this.userService.logout();
    this.navCtrl.pop();
  }
}
