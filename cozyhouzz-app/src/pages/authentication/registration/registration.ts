import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';


import {GeneralRegistrationPage} from './general-user/registration';
import {BussinessManRegistrationPage} from './buisnessman-user/registration';

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html'
})
export class RegistrationPage {
  user: any;
  delimiter: number = 0; // delimiter 1이면 사업자, 0이면 기본 유저
  constructor(
    public navCtrl: NavController,
    public menu: MenuController
  ) {
    this.menu.close();
  }

  /**
   *
   * @param delimiter 구분자
   * 일반사용자 회원가입을 할 것인가,
   * 사업주 사용자 회원가입을 할 것인가는 delimiter을 가지고 구분함.
   *
   * selectRegistrationType(0) -> 일반 사용자
   * selectRegistrationType(1) -> 사업주 사용자
   * 아래 if문에서 서로 다른 페이지를 push해주면 됨.
   * */
  selectRegistrationType(delimiter) {
    if(delimiter==0) {
      this.navCtrl.push(GeneralRegistrationPage);
    } else {
      this.navCtrl.push(BussinessManRegistrationPage);
    }
  }
}
