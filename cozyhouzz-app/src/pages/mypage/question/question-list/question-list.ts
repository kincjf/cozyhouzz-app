import { Component, ViewChild } from '@angular/core';
/*
import { Validators, FormBuilder } from '@angular/forms';
import { NavController, Content } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthenticatorService } from "../../../../providers/authenticator";
import { Loader } from '../../../../providers/loader';
import { User } from "../../../../providers/user";
*/


@Component({
  selector: 'page-question-list',
  templateUrl: 'question-list.html'
})
export class QuestionListPage {
 /* @ViewChild(Content) content: Content;

  userDetails: User;
  chatControl: any;

  messages: FirebaseListObservable<any[]>;
  message: string = '';
*/
  constructor(
    /*public navCtrl: NavController,
    public af: AngularFire,
    private loader: Loader,
    private formBuilder: FormBuilder,
    private authenticatorService: AuthenticatorService*/
  ) {
   /* this.messages = <FirebaseListObservable<any>> af.database.list('messages', {
      query: { limitToLast: 5, orderByKey: true }
    });*/
  }
/*
  sendMessage() {
  }

  ionViewDidLoad() {
    this.messages.subscribe(() => {
      setTimeout(() => this.content.scrollToBottom(500), 250);
    });
  }

  ionViewWillLoad() {
    this.chatControl = this.formBuilder.group({
      message: ['', Validators.required]
    });
    this.authenticatorService.anonymousUser();

    this.af.database.list('users/5').push({test:"test"}).then(() => {

    });
  }

  logout() {
    this.af.auth.logout();
    this.navCtrl.pop();
  }*/
}
