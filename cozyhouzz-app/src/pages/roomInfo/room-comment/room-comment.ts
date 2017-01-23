import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DomSanitizer, SafeUrl, SafeResourceUrl} from '@angular/platform-browser';
/*
  Generated class for the roomInfoComment page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-build-case-comment',
  templateUrl: 'room-comment.html'
})
export class RoomCommentPage {

  disqusURL: SafeResourceUrl;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {

    this.disqusURL = sanitizer.bypassSecurityTrustResourceUrl('http://localhost:3000');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomCommentPage');
  }

}
