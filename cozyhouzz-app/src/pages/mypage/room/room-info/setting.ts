import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RoomService } from '../../../../services/room-service';
import { Room } from '../../../../providers/room';
import { Events } from 'ionic-angular';

/*
  Generated class for the Setting page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class RoomSettingPage {
  roomService: RoomService;
  room: Room;
  events: Events;
  storage:Storage;
  deposit;
  monthly;
  constructor(public navCtrl: NavController, private Events:Events,
              private s: Storage, private RoomService:RoomService) {
      this.storage = s;
      this.events = Events;
      this.roomService = RoomService;

      this.loadRoomInformation();
  }
  ionViewWillEnter() {
    this.loadRoomInformation();
    console.log("SettingPage ionViewWillEnter()");

  }
  //방 정보 가져옴,
 loadRoomInformation() {
    this.room = this.roomService.room;
    this.deposit = {
      lower : this.room.deposit_lower,
      upper : this.room.deposit_upper
    };
    this.monthly ={
      lower : this.room.monthly_lower,
      upper : this.room.monthly_upper
    };
    console.log(this.deposit);
  }
  ionViewDidLoad() {
    console.log('Hello SettingPage Page');
  }
  ionViewDidLeave() {
    this.storage.set('roomSettingInformation', this.room);
    this.events.publish('room:change', '');//user:logined room:change

  }
  change_monthly() {
    this.room.monthly_lower = this.monthly.lower;
    this.room.monthly_upper = this.monthly.upper;
  }
  change_deposit() {
    this.room.deposit_lower = this.deposit.lower;
    this.room.deposit_upper = this.deposit.upper;
  }

}
