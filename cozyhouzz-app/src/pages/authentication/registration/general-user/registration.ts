import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
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
    private formBuilder: FormBuilder,
    private loader: Loader,
    private alertCtrl: AlertController,
    public menu: MenuController
  ) {

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

    this.navCtrl.pop();

  }
}
