import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';
import { AlertController } from 'ionic-angular';
import { Events } from "ionic-angular";
import { Loader } from '../../../providers/loader';


import {GeneralRegistrationPage} from './general-user/registration';
import {BussinessManRegistrationPage} from './buisnessman-user/registration';

/*
   Generated class for the Registration page.
 */
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
  selectRegistrationType(delimiter) {
    if(delimiter==0) {
      this.navCtrl.push(GeneralRegistrationPage);
    } else {
      this.navCtrl.push(BussinessManRegistrationPage);
    }
  }
}
