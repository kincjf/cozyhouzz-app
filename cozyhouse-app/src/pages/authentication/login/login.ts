import { Component } from '@angular/core';
import { ModalController, NavController, MenuController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthenticatorService } from "../../../providers/authenticator";
import { GeneralRegistrationPage } from '../registration/general-user/registration';
import { AlertController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../../../services/user-service';
import { PostService } from '../../../services/post-service';
import { config } from '../../../app/common/config';
import { STATIC_VALUE } from "../../../app/common/config/staticValue";
import {User} from "../../../providers/user";
/*
  Generated class for the Login page.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  userFormBuilder: any;
  storage: Storage;
  userService:UserService;
  constructor(
    private events: Events,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private authenticator: AuthenticatorService,
    public menu: MenuController,
    public s : Storage,
    public u : UserService
  ) {
    this.storage = s;
    this.userService = u;
    this.menu = menu;
    this.menu.close();
    //this.menu.enable(false); // 현재 login 페이지에서 side menu 사용하도록 해놓음..

  }

  ionViewWillLoad() {
    this.userFormBuilder = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  doSomethingAfterUserLogin(user) {
    console.info(`You can do something with the user details: ${JSON.stringify(user)}`);
  }

  // Anonymous user login
  anonymousUser() {
    this.authenticator.anonymousUser()
    .then((user) => {
      this.doSomethingAfterUserLogin(user);
    })
    .catch((e) => {
      let prompt = this.alertCtrl.create({
        title: 'Error',
        message: `Failed to login ${e.message}`,
        buttons: [{ text: 'Ok' }]
      });
      prompt.present();
    });
  }
  // 페이지 닫힐때 이벤트. 위에서 사이드 메뉴 사용 금지시킨거 다시 풀어야함.
  ionViewWillLeave() {

    this.menu.enable(true);
  }
  signInWithOAuth(provider: string) {
    //INFO: Change this method to enable/disable browser mode
    // this.authenticator.signInWithOAuth(provider)
    /*this.authenticator.signInWithOAuthBrowserMode(provider)
    .then((user) => {
      this.doSomethingAfterUserLogin(user);
    })
    .catch((e) => {
      let prompt = this.alertCtrl.create({
        title: 'Error',
        message: `Failed to login ${e}`,
        buttons: [{ text: 'Ok' }]
      });
      prompt.present();
    });
    */
  }

  // Perform login using user and password
  login() {
    let email = this.userFormBuilder.controls.email.value;
    let password = this.userFormBuilder.controls.password.value;

    let user = this.userService.login("http://api.cozyhouzz.co.kr/api/auth/login", {
      email: email,
      password: password
    }).toPromise()
      .then(
        response => {
          this.storage.set("user", response);
          this.userService.setUserInfo(new User(response));
          this.navCtrl.pop()
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
    this.alertCtrl.create({
      title: 'Reset your password',
      message: "Enter your email so we can send you a link to reset your password",
      inputs: [ { type: 'email', name: 'email', placeholder: 'Email' } ],
      buttons: [
        { text: 'Cancel', handler: data => {} },
        {
          text: 'Done',
          handler: data => {
            this.authenticator.resetPassword(data.email)
            .then(() => {
              this.alertCtrl.create({
                title: 'Success',
                message: 'Your password has been reset - Please check your email for further instructions.',
                buttons: [{ text: 'Ok' }]
              }).present();
            })
            .catch((e) => {
              this.alertCtrl.create({
                title: 'Error',
                message: `Failed to login ${e.message}`,
                buttons: [{ text: 'Ok' }]
              }).present();
            });
          }
        }
      ]
    }).present();
  }

}
