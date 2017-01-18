import { Injectable } from "@angular/core";
import { Room } from "../providers/room";
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

/*
* 이부분은 다시 짜는게 좋을 수도....
* 일부로 private로 했는데, 그리고 getter setter도 만들었었는데
* storage만 넣었다 하면 해당 getter, setter가 유지가 안됨.. ㅡㅡ
* provider/room.ts도 마찬가지.
* 코드 거지같음.
* */
@Injectable()
export class RoomService {

  private _room:Room;
  constructor(public storage:Storage, public events:Events) {

      this._room = new Room();
      this.storage.get('roomSettingInformation').then((val) => {
        if(val) {
          // this._room = val as Room 이 안됨;
          // 하나하나 넣어줘야 타입 유지 됨.
          // 아마도 저장될 때 private, public , getter, setter등의 정보가 정부다 없어지는 듯.
          // 그렇기 때문에 가져온 것은 전부 public
          this._room.deposit_max = val._deposit_max;
          this._room.deposit_lower = val._deposit_lower;
          this._room.filter = val._filter;
          this._room.deposit_upper = val._deposit_upper;
          this._room.isCharter = val._isCharter;
          this._room.isOneRoomDuplex = val._isOneRoomDuplex;
          this._room.isOneRoomOpen = val._isOneRoomOpen;
          this._room.isThreeRoom = val._isThreeRoom;
          this._room.isOneRoomSeperation = val._isOneRoomSeperation;
          this._room.isTwoRoom = val._isTwoRoom;
          this._room.monthly_lower = val._monthly_lower;
          this._room.monthly_max = val._monthly_max;
          this._room.monthly_upper = val._monthly_upper;
        }
        console.log(this._room);
      });
  }

  get room(): Room {
    return this._room;
  }

  set room(value: Room) {
    this._room = value;
  }
}
