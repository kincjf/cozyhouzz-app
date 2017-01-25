import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { RoomListPage } from '../roomInfo/room-list/room-list';
// import {LatelyRoomListPage} from '../roomInfo/lately-room-list/lately-room-list';
import {DibRoomListPage} from '../roomInfo/dib-room-list/dib-room-list';
import { MyPage } from '../mypage/mypage';
import {LoginPage} from '../authentication/login/login';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page


  tab1Root: any = HomePage;
  tab2Root: any = RoomListPage;
  tab3Root: any = DibRoomListPage;
  // tab4Root: any = DibRoomListPage;
  tab5Root: any = MyPage;
  constructor() {

  }
}
