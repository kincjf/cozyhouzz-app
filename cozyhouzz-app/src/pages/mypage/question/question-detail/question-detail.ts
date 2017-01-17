import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import {Inject} from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseRef } from 'angularfire2';
import { Loader } from '../../../../providers/loader';

@Component({
  selector: 'page-question-detail',
  templateUrl: 'question-detail.html'
})
export class QuestionDetailPage {
  @ViewChild(Content) content: Content;

  userDetails: any;
  chatControl: any;

  messages: FirebaseListObservable<any[]>;
  message: string = '';

  constructor(
    public navCtrl: NavController,
    public af: AngularFire,
    private loader: Loader,
    private formBuilder: FormBuilder
  ) {


    // Get messages and join with user details
    /*const test = "테스트";

    this.messages = <FirebaseListObservable<any>> af.database.list('messages/', {
      query: {
        orderByChild: "test",
        equalTo : "테스트"
      }//{ limitToLast: 5, orderByKey: true }
    });
    console.log(this.messages);
*/
  }

  sendMessage() {
   // console.debug("sending message to chat " + this.constructor.name);
    /*this.af.database.list('/messages')
      .push({
        fullName: this.userDetails.fullName,
        provider: this.userDetails.provider,
        avatar: this.userDetails.avatar,
        userUid: this.userDetails.uid,
        value: this.message
      });*/
    this.message = '';
  }

  ionViewDidLoad() {
    // 타이머 돌려놓고 가져오는 방식임...........그럼 여기서...............자기 아이디 및 방에 맞는 데이터를..
    //this.messages.subscribe(() => {
    //  setTimeout(() => this.content.scrollToBottom(500), 250);
    //});
  }

  ionViewWillLoad() {
    //this.chatControl = this.formBuilder.group({
     // message: ['', Validators.required]
    //});
    //this.userDetails = new User(this.authenticatorService.getUser().uid);
  }

  logout() {
    //this.af.auth.logout();
    //this.navCtrl.pop();
  }
}
