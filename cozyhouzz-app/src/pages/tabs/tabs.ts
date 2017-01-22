import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { BuildCaseListPage } from '../buildCase/build-case-list/build-case-list';
import {LatelyBuildCaseListPage} from '../buildCase/lately-build-case-list/lately-build-case-list';
import {DibBuildCaseListPage} from '../buildCase/dib-build-case-list/dib-build-case-list';
import { MyPage } from '../mypage/mypage';
import {LoginPage} from '../authentication/login/login';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page


  tab1Root: any = HomePage;
  tab2Root: any = BuildCaseListPage;
  tab3Root: any = DibBuildCaseListPage;
  tab4Root: any = LatelyBuildCaseListPage;
  tab5Root: any = MyPage;
  constructor() {

  }
}
