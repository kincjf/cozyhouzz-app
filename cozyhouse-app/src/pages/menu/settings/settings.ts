import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Loader } from '../../../providers/loader';
import { User } from "../../../providers/user";
import { Storage } from '@ionic/storage';
import { UserService } from '../../../services/user-service';
/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  userFormBuilder: any;
  userDetails: User;
  storage: Storage;
  userService:UserService;
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private loader: Loader,
    private alertCtrl: AlertController,
    private UserService:UserService
  ) {
      this.userService = UserService;
      if(this.userService.getIsLogind()) {
          this.userDetails = this.userService.getUserInfo();
      }
  }

  ionViewWillLoad() {

    if(this.userDetails.delimiter == 1) {
      this.userFormBuilder = this.formBuilder.group({
/*
        fullName: ['', Validators.required],
        businessName: ['', Validators.required],
        businessAddress: ['', Validators.required],
        cellPhone: ['', Validators.required]
*/
      });
    } else if(this.userDetails.delimiter == 0) {
      this.userFormBuilder = this.formBuilder.group({
        /*
        fullName: ['', Validators.required],
        cellPhone: ['', Validators.required]
        */
      });

    }

  }

  updateUserSettings() {
    /*
    console.debug("updating user details on firebase " + this.constructor.name);
    var update_info;
    let fullName = this.userDetails.fullName;
    let cellPhone = this.userDetails.cellPhone;
    if(this.userDetails.delimiter == 0){
       update_info = {fullName: fullName, cellPhone:cellPhone};
    } else if(this.userDetails.delimiter == 1) {
      let businessAddress = this.userDetails.businessAddress;
      let businessName = this.userDetails.businessName;
      update_info = {
        fullName: fullName,
        cellPhone:cellPhone,
        businessAddress:businessAddress,
        businessName:businessName
      };
    }

    this.loader.show("Updating your settings...");
    this.userDetails.update(update_info)
    .then((user) => {
        this.loader.hide();
        this.alertCtrl.create({
          title: 'Success',
          message: 'Details updated',
          buttons: [{ text: 'Ok' }]
        }).present();
        this.navCtrl.pop();
    })
    .catch((e) => {
      this.loader.hide();
      console.error(`Password Login Failure:`, e)
      this.alertCtrl.create({
        title: 'Error',
        message: `Failed to update details. ${e.message}`,
        buttons: [{ text: 'Ok' }]
      }).present();
    });*/
  }
}
