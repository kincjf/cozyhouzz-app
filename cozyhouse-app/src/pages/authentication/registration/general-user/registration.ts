import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';
import { AlertController } from 'ionic-angular';
import { Events } from "ionic-angular";
import { Loader } from '../../../../providers/loader';

/*
   Generated class for the Registration page.
 */
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html'
})
export class GeneralRegistrationPage {
  user: any;
  delimiter: number = 0; // delimiter 1이면 사업자, 0이면 기본 유저
  constructor(
    private events: Events,
    public navCtrl: NavController,
    public af: AngularFire,
    private formBuilder: FormBuilder,
    private loader: Loader,
    private alertCtrl: AlertController,
    public menu: MenuController
  ) {

    this.menu = menu;
    this.menu.close();

  }

  ionViewWillLoad() {
    // Validate user registration form
    this.user = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      cellphone: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      passwordConfirmation: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  // Create user using form builder controls
  createUser() {
    let fullName = this.user.controls.fullName.value;
    let email = this.user.controls.email.value;
    let cellphone = this.user.controls.cellphone.value;
    let password = this.user.controls.password.value;
    let passwordConfirmation = this.user.controls.passwordConfirmation.value;
    this.loader.show("Creating user...");
    new Promise((resolve, reject) => {
      if (passwordConfirmation != password) {
        reject(new Error('Password does not match'));
      } else {
        resolve();
      }
    })
    .then(() => {
      // 새로 만들어지는 계정에 대한 정보를 전송하는 부분
      // 이메일, 패스워드만 삽입되어 있음.
      return this.af.auth.createUser({ email, password })
    })
    .then((user) => {
      this.events.publish('user:create', user);
      // Login if successfuly creates a user
      return this.af.auth.login({ email, password }, {
        method: AuthMethods.Password,
        provider: AuthProviders.Password
      });
    })
    .then((user) => {
      console.log(JSON.stringify(user));
      // CUSTOMISE: Here you can add more fields to your user registration
      // those fields will be stored on /users/{uid}/
      let userRef = this.af.database.object('/users/' + user["auth"]["uid"]);
      userRef.set({ email:email, provider: user["provider"], fullName: fullName, cellPhone: cellphone, delimiter:this.delimiter });
      this.loader.hide();
      // this.navCtrl.pop();
      // this.navCtrl.push(AboutPage, { user: user });
    })
    .catch((e) => {
      this.loader.hide();
      this.alertCtrl.create({
        title: 'Error',
        message: `Failed to login. ${e.message}`,
        buttons: [{ text: 'Ok' }]
      }).present();
    });
    this.navCtrl.pop();

  }
}
