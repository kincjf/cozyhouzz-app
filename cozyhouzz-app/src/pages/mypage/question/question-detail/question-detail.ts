import { Component,NgZone ,ViewChild} from '@angular/core';
import { NavController,NavParams,Content,ActionSheetController } from 'ionic-angular';
import * as firebase from 'firebase';
import {GlobalVars} from '../../../../providers/globalvars';
import {NativeAudio,Camera} from 'ionic-native';
import {Md5} from "ts-md5/dist/md5";

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
  _chats;
  messages:any;
  firstChatId;
  secondChatId;
  chatId;
  _user;
  _lastChats;
  constructor(public navCtrl: NavController,public params: NavParams,private zone: NgZone,public GlobalVars:GlobalVars,public actionSheetCtrl:ActionSheetController) {

    //console.log(this);
    //GlobalVars.setToUserKey(this.toUserData.userKey)
  }
  ionViewWillEnter() {
    this.toUserData =this.params.get('receiver');
    this.userData = this.params.get('sender');

    console.log("Sdfsdf");
    console.log(this.toUserData);

    console.log(this.userData);
    this._chats = [];
    this._lastChats = [];
    this._chats = firebase.database().ref('chats');
    this._lastChats = firebase.database().ref('lastchat');
    this.messages = [];
    this.chatId = this.userData;
    //console.log(this.toUserData);
    this.getChats();
    this._lastChats.child(this.userData).child(this.toUserData).child('isRead').set('1');

  }
  getChats()
  {
    console.log(this.userData + this.chatId);
    this._chats.child(this.userData).orderByChild('receiverKey').equalTo(this.toUserData).on('child_added',(data) =>{
      this.zone.run(() => {
        let tempArray = data.val();

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
        this.messages.push(tempArray);

        // console.log(this.messages);
        setTimeout(() =>{
          this.content.scrollToBottom();
        },300)

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
    },2000)
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
      chatId:this.toUserData,
    };

    let messageArrayForToUser = {
      senderKey:this.userData,
      receiverKey:this.toUserData,
      message:message,
      loginUserKey:this.userData,
      isType:isType,
      isRead:'0',
      dateTime:new Date().toString(),
      chatId:this.userData
    };
    NativeAudio.play('sendmessage', () => console.log('uniqueId1 is done playing'));

    let resUser =  this._chats.child(this.userData).push(messageArrayForUser);
    if(resUser)
    {
      this._lastChats.child(this.userData).child(this.toUserData).set(messageArrayForUser)
    }
    let resToUser = this._chats.child(this.toUserData).push(messageArrayForToUser);
    if(resToUser)
    {
      this._lastChats.child(this.toUserData).child(this.userData).set(messageArrayForToUser)
    }
    this.messageText = '';

  }


  imageShare()
  {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose your image',
      buttons: [
        {
          text: 'Gallery',
          role: 'destructive',
          handler: () => {
            this.openCamera(0)
            console.log('Destructive clicked');
          }
        },{
          text: 'Camera',
          handler: () => {
            this.openCamera(1)
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

  // choose image from gallery/camera
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
}
