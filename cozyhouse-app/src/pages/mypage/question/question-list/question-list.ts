import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NavController, Content, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthenticatorService } from "../../../../providers/authenticator";
import { Loader } from '../../../../providers/loader';
import { User } from "../../../../providers/user";

@Component({
  selector: 'page-question-list',
  templateUrl: 'question-list.html'
})
export class QuestionListPage {
  @ViewChild(Content) content: Content;

  userDetails: User;
  chatControl: any;

  channels: FirebaseListObservable<any[]>;
  message: string = '';
  user:any;
  constructor(
    public navCtrl: NavController,
    public af: AngularFire,
    private loader: Loader,
    private formBuilder: FormBuilder,
    private authenticatorService: AuthenticatorService,
    public params:NavParams,
  ) {
    // Get messages and join with user details

  }

  sendMessage() {

    this.message = '';
  }

  ionViewDidLoad() {
    // 타이머 돌려놓고 가져오는 방식임...........그럼 여기서...............자기 아이디 및 방에 맞는 데이터를..
  }

  ionViewWillLoad() {

  }

  logout() {
  }
}
