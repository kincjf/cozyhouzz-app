import { Component,NgZone ,ViewChild} from '@angular/core';
import { NavController,NavParams,Content,ActionSheetController } from 'ionic-angular';
import * as firebase from 'firebase';
import {GlobalVars} from '../../../../providers/globalvars';
import {NativeAudio,Camera} from 'ionic-native';
import {Loader} from "../../../../providers/loader";


/*
 Generated class for the Chatting page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-question-detail',
  templateUrl: 'question-detail.html'
})
export class QuestionDetailPage {
  @ViewChild(Content) content: Content;

  messageText;
  toUserData;
  userData;
  toMd5UserData;
  md5UserData;
  _chats;
  messages:any;
  chatId;
  _lastChats;
  user;

  msecond = 0;
  constructor(public navCtrl: NavController,public params: NavParams,private zone: NgZone, public loader:Loader ,public GlobalVars:GlobalVars,public actionSheetCtrl:ActionSheetController) {
    this.user = this.params.get('user');
    this.userData = this.user.userData;
    this.toUserData = this.user.toUserData;
    this.toMd5UserData = this.user.toMd5UserData;
    this.md5UserData = this.user.md5UserData;

    this._chats = firebase.database().ref('chats');
    this._lastChats = firebase.database().ref('lastchat');
    this.messages = [];
    this.chatId = this.md5UserData;
    this.getChats();
    this._lastChats.child(this.md5UserData).child(this.toMd5UserData).child('isRead').set('1');

    setTimeout(() =>{
      this.content.scrollToBottom();
      this.msecond = 0;
    },0)
  }
  ionViewWillEnter() {

  }
  getChats()
  {
    console.log(this.md5UserData + this.chatId);
    this._chats.child(this.md5UserData).orderByChild('chatId').equalTo(this.toMd5UserData).limitToLast(15).on('child_added',(data) =>{
      this.zone.run(() => {
        let tempArray = data.val();
        this.messages.push(tempArray);

        setTimeout(() =>{
          this.content.scrollToBottom();
        },this.msecond)

      });

    })
  }

  ionViewWillLeave() {
    console.log('Hello ChattingPage Page');
    this.GlobalVars.setToUserKey('null')
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
  onBlur(event){
    setTimeout(() =>{
      this.content.scrollToBottom();
    },0)
  }
  sendMessage(message,isType,textarea){
    if(textarea){
      textarea.setFocus();
    }
    let  currentDate= new Date().toString();

    let messageArrayForUser = {
      senderKey: this.userData, //this.userData.userKey,
      receiverKey:this.toUserData,
      message:message,
      loginUserKey:this.userData,
      isType:isType,
      isRead:'0',
      dateTime:currentDate,
      chatId:this.toMd5UserData,
      realChatId: this.toUserData
    };

    let messageArrayForToUser = {
      senderKey:this.userData,
      receiverKey:this.toUserData,
      message:message,
      loginUserKey:this.userData,
      isType:isType,
      isRead:'0',
      dateTime:new Date().toString(),
      chatId:this.md5UserData,
      realChatId: this.userData
    };
    NativeAudio.play('sendmessage', () => console.log('uniqueId1 is done playing'));
    console.log(messageArrayForUser);
    console.log(messageArrayForToUser);
    let resUser =  this._chats.child(this.md5UserData).push(messageArrayForUser);
    if(resUser)
    {
      this._lastChats.child(this.md5UserData).child(this.toMd5UserData).set(messageArrayForUser)
    }
    let resToUser = this._chats.child(this.toMd5UserData).push(messageArrayForToUser);
    if(resToUser)
    {
      this._lastChats.child(this.toMd5UserData).child(this.md5UserData).set(messageArrayForToUser)
    }
    this.messageText = '';

  }

/*

  imageShare()
  {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose your image',
      buttons: [
        {
          text: 'Gallery',
          role: 'destructive',
          handler: () => {
            this.openCamera(0);
            console.log('Destructive clicked');
          }
        },{
          text: 'Camera',
          handler: () => {
            this.openCamera(1);
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
*/

  // choose image from gallery/camera
/*
  openCamera(type){

    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: type,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };

    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let shareImage = 'data:image/jpeg;base64,' + imageData;
      this.sendMessage(shareImage,1,null)
    }, (err) => {
      // Handle error
    });
  }
*/
}
