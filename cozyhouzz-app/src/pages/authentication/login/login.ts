import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { GeneralRegistrationPage } from '../registration/general-user/registration';
import { AlertController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../../../services/user-service';
import { HomePage } from '../../home/home';
import {config} from '../../../app/common/config';
/*
  Generated class for the Login page.
*/

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  userFormBuilder: any;
  constructor(
    private events: Events,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    public menu: MenuController,
    public storage : Storage,
    public userService : UserService
  ) {
    this.menu.close();
    this.menu.enable(false);


  }

  ionViewWillLoad() {
    this.userFormBuilder = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  // Perform login using user and password
  login() {
    let email = this.userFormBuilder.controls.email.value;
    let password = this.userFormBuilder.controls.password.value;

    // let URL = [config.serverHost, config.path.login].join('/');
    let user = this.userService.login("http://api.cozyhouzz.co.kr/api/auth/login", {
      email: email,
      password: password
    }).toPromise()
      .then(
        response => {
            console.log(response);
            this.storage.set("id_token", response.id_token);
            this.userService.setUserInfo(response.id_token);
            this.navCtrl.pop();
        },
        err => {
          this.alertCtrl.create({
            title: 'Error',
            message: 'Failed to login ' + err,
            buttons: [{text: 'Ok'}]
          }).present();
        }
      );
  }
  // Push registration view
  signUp() {
    this.navCtrl.push(GeneralRegistrationPage);
  }

  // Reset password
  resetPassword() {

  }

}
