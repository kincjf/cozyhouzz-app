import {Component, NgZone} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import * as firebase from 'firebase';
import {GlobalVars} from '../../../../providers/globalvars';
import {QuestionDetailPage} from '../question-detail/question-detail';
import {Md5} from "ts-md5/dist/md5";
import {UserService} from '../../../../services/user-service';
@Component({
  selector: 'page-question-list',
  templateUrl: 'question-list.html'
})
export class QuestionListPage {
  userData;
  _chats;
  user;
  _lastChats;
  recentChats;
  blob;
  user_delimiter;


  isLogined: boolean = false;

  constructor(public navCtrl: NavController, private zone: NgZone, public GlobalVars: GlobalVars, public params: NavParams,
    public userService:UserService) {
    this.isLogined = userService.getIsLogind();
    if(this.isLogined) {
      this.user = userService.getUserInfo();
      this.user_delimiter = Md5.hashStr(this.user.email);

      this.recentChats = [];
      this._chats = firebase.database().ref('chats');
      this._lastChats = firebase.database().ref('lastchat');
      this._lastChats.child(this.user_delimiter).on('child_added', (data) => {
        this.zone.run(() => {
          let tempArray = data.val();
          this.recentChats.push(tempArray);
        });
      });
    }

  }

  chatSelect(receiver) {
    let user = {
      userData: this.user.email,
      md5UserData: Md5.hashStr(this.user.email),
      toUserData: receiver,
      toMd5UserData: Md5.hashStr(receiver)
    };

    this.navCtrl.push(QuestionDetailPage, {
      user:user
    });
  }

}
