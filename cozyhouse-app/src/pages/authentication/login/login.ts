import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { GeneralRegistrationPage } from '../registration/general-user/registration';
import { AlertController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../../../services/user-service';
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

  }
  // 페이지 닫힐때 이벤트. 위에서 사이드 메뉴 사용 금지시킨거 다시 풀어야함.
  ionViewWillLeave() {

    this.menu.enable(true);
  }
  signInWithOAuth(provider: string) {

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
            console.log(response);
            this.storage.set("id_token", response.id_token);
            this.userService.setUserInfo(response.id_token);
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
  }

}
