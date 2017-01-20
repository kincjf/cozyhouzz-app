import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the LatelyBuildCaseList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-lately-build-case-list',
  templateUrl: 'lately-build-case-list.html'
})
export class LatelyBuildCaseListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LatelyBuildCaseListPage');
  }

  ionViewWillEnter() {
    console.log("Sfsdf");
  }
}
