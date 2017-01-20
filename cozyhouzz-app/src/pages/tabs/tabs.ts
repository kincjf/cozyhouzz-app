import { Component, ViewChild } from '@angular/core';

import { HomePage } from '../home/home';
import { BuildCaseListPage } from '../buildCase/build-case-list/build-case-list';
import { QuestionListPage } from '../mypage/question/question-list/question-list';
import { UserInfoDetailPage} from '../mypage/userInfo/user-info-detail/user-info-detail';
import { Menu } from '../menu/menu';
import { UserService } from '../../services/user-service';
import { LoginPage } from '../authentication/login/login';
import {Tabs} from "ionic-angular";

import { RoomSettingPage } from '../mypage/room/room-info/setting';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  @ViewChild("paymentTabs") paymentTabs: Tabs;


  tab1Root: any = HomePage;
  tab2Root: any = BuildCaseListPage;
  tab3Root: any = BuildCaseListPage;
  tab4Root: any = BuildCaseListPage;
  tab5Root: any = RoomSettingPage;
  constructor(userService: UserService) {

  }
}
