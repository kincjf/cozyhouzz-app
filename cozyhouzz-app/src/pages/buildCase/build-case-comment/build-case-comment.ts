import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DomSanitizer, SafeUrl, SafeResourceUrl} from '@angular/platform-browser';
/*
  Generated class for the BuildCaseComment page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-build-case-comment',
  templateUrl: 'build-case-comment.html'
})
export class BuildCaseCommentPage {

  disqusURL: SafeResourceUrl;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {

    this.disqusURL = sanitizer.bypassSecurityTrustResourceUrl('http://localhost:3000');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuildCaseCommentPage');
  }

}
