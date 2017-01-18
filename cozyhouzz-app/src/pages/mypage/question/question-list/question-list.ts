import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-question-list',
  templateUrl: 'question-list.html'
})
export class QuestionListPage {

  user: any;

  constructor(public navCtrl: NavController,
              public params: NavParams,) {

  }

  ionViewDidLoad() {

  }

  ionViewWillLoad() {

  }
}
