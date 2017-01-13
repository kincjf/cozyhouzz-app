import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import {NavController, MenuController, NavParams, Events} from 'ionic-angular';
import { ZipCodePage } from '../../zip-code/zip-code';
/*
  Generated class for the BuildCaseInput page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-build-case-input',
  templateUrl: 'build-case-input.html'
})
export class BuildCaseInputPage {
  post: any;
  constructor(public navCtrl: NavController, private menu: MenuController, private events:Events,
    private formBuilder: FormBuilder, private params: NavParams) {
    events.subscribe('address:choiced', (address) => {
      this.post.patchValue(
        {
          address: address.zipNo + ' - ' + address.jibunAddr
        }
      );
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ZipCodePage');

  }
  ionViewWillLoad() {
      // Validate user registration form
      this.post = this.formBuilder.group({
          title : ['', Validators.required],
          content : ['', Validators.required],
          address : ['', Validators.required],
        zip_code : ['', Validators.required]
      });
  }

  addressInputClick() {
    console.log("로그인 이벤트 발생");
    console.log("sdfsdf");
    this.navCtrl.push(ZipCodePage);

  }

}
