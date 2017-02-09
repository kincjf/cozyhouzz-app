import {Component, NgZone} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import * as firebase from 'firebase';
import {GlobalVars} from '../../../../providers/globalvars';
import {QuestionDetailPage} from '../question-detail/question-detail';
import {Md5} from "ts-md5/dist/md5";
import {UserService} from '../../../../services/user-service';
import {Loader} from "../../../../providers/loader";
import {Config} from "../../../../app/config";
@Component({
  selector: 'page-question-list',
  templateUrl: 'question-list.html'
})
export class QuestionListPage {
  userData;
  _chats;
  user;
  _lastChats;
  recentChats:Array<any>;
  blob;
  user_delimiter;


  isLogined: boolean = false;

  constructor(public navCtrl: NavController,  public loader:Loader, public GlobalVars: GlobalVars, public params: NavParams,
    public userService:UserService, public alertCtrl:AlertController) {


  }
  ionViewWillEnter() {
    this.recentChats = [];
    let testing = this.recentChats;
    this.isLogined = this.userService.getIsLogind();
    let loader = this.loader;
    if(this.isLogined) {
      loader.show("1:1 대화 목록을 불러오고 있습니다.");

      this.user = this.userService.getUserInfo();
      this.user_delimiter = Md5.hashStr(this.user.email);

      this._chats = firebase.database().ref('chats');
      this._lastChats = firebase.database().ref('lastchat');


      this._lastChats.child(this.user_delimiter).once('value').then(function(data) {

        let tempArray = data.val();
        for(let temp in tempArray) {
          if(tempArray[temp].chatId == null || tempArray[temp].chatId == undefined) {

          } else {
            testing.push(tempArray[temp]);
          }
          console.log(tempArray[temp]);
        }
        loader.hide();

        //console.log(tempArray);
        //this.recentChats.push(tempArray);
      });
      /*  this.recentChats = [];

       this._lastChats.child(this.user_delimiter).on('child_added', (data) => {
       if(this.recentChats.length <= 0) {
       this.loader.hide();

       }
       this.zone.run(() => {
       let tempArray = data.val();
       console.log(tempArray);
       this.recentChats.push(tempArray);
       });
       });*/
    } else {
      let alert = this.alertCtrl.create({
        title: '1:1 대화',
        message: '로그인이 필요한 항목입니다. 로그인 페이지로 이동합니다.',
        buttons: [

          {
            text: '로그인',
            handler: () => {
              Config.SELECTED_TABS_MENU = 'LoginPage';
              this.navCtrl.parent.select(4);
              console.log("login page로 이동하기");
            }
          }
        ]
      });
      alert.present();
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
