import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello BuildCaseInputPage Page');
  }

}
