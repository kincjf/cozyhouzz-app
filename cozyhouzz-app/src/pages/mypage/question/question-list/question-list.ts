import {Component, NgZone} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import * as firebase from 'firebase';
import * as _ from 'lodash';
import {GlobalVars} from '../../../../providers/globalvars';
import {QuestionDetailPage} from '../question-detail/question-detail';
import {Md5} from "ts-md5/dist/md5";
@Component({
  selector: 'page-question-list',
  templateUrl: 'question-list.html'
})
export class QuestionListPage {
  segmentSelected;
  _user;
  _onlineUser;
  allUserAray:any;
  onlineUser:any;
  userData;
  _chats;
  user;
  _lastChats;
  recentChats;
  blob;
  user_delimiter;
  constructor(public navCtrl: NavController, private zone: NgZone, public GlobalVars:GlobalVars, public params: NavParams) {
    this.user = this.params.get('user');
    this.user_delimiter = Md5.hashStr(this.user.email);
    console.log(this.user_delimiter);

    this.allUserAray = [];
    this.onlineUser = [];
    this.recentChats = [];
    this._user = firebase.database().ref('user');
    this._onlineUser = firebase.database().ref('onlineUser');
    this._chats = firebase.database().ref('chats');
    this._lastChats = firebase.database().ref('lastchat');
    this._lastChats.child(this.user_delimiter).on('child_added',(data) =>{
      this.zone.run(() => {
        let tempArray = data.val();
        this.recentChats.push(tempArray);
        // if(tempArray.loginUserKey == tempArray.senderKey)
        // {
        //   // loginuser profile data;
        //   let userData = this.userData;
        //   let toUserData = this.toUserData;
        // }
        // else
        // {
        //   // to user profile data
        //   let userData = this.toUserData;
        //   let toUserData = this.userData;
        // }
        //
        // tempArray.userData = userData

      });

     })
  }

  chatSelect(receiver) {
      this.navCtrl.push(QuestionDetailPage, {
        sender: this.user_delimiter,
        receiver: receiver
      });
  }

}
