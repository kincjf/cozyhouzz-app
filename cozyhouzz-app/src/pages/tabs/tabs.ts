import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { RoomListPage } from '../roomInfo/room-list/room-list';
import {DibRoomListPage} from '../roomInfo/dib-room-list/dib-room-list';
import { MyPage } from '../mypage/mypage';
import {QuestionListPage} from '../mypage/question/question-list/question-list';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = HomePage;
  tab2Root: any = RoomListPage;
  tab3Root: any = DibRoomListPage;
  tab4Root: any = QuestionListPage;
  tab5Root: any = MyPage;
  constructor() {

  }
}

