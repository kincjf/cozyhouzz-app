import { Component, ViewChild } from '@angular/core';
import {Nav, ViewController, MenuController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { BuildCaseListPage } from '../buildCase/build-case-list/build-case-list';
import {RegistrationPage} from '../authentication/registration/registration';
import { LoginPage } from '../authentication/login/login'
import { BuildCaseInputPage } from '../buildCase/build-case-input/build-case-input';
import { UserInfoDetailPage } from '../mypage/userInfo/user-info-detail/user-info-detail';
import { UserInfoModifyPage } from '../mypage/userInfo/user-info-modify/user-info-modify';

import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { RoomSettingPage } from '../mypage/room/room-info/setting';
import { QuestionListPage } from '../mypage/question/question-list/question-list';
import { UserService } from '../../services/user-service';
import { TabsPage } from '../tabs/tabs';
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class Menu {
  @ViewChild(Nav) nav: Nav;
  isLogined:boolean = false;
  user:any;
  rootPage: any = TabsPage;
  build_pages: Array<{title: string, component: any, flag:boolean, ios:string, md:string}>;
  build_push_pages: Array<{title: string, component: any, flag:boolean, ios:string, md:string}>;
  main_pages: Array<{title: string, component: any, flag:boolean, ios:string, md:string}>;
  etc_pages: Array<{title: string, component: any, flag:boolean, ios:string, md:string}>;
  constructor(
    public navCtrl: NavController,
    public events: Events,
    public viewController: ViewController,
    public userService: UserService,
    public menu:MenuController
  ) {
    this.isLogined =  this.userService.getIsLogind();
    if(this.isLogined) {
      this.user = this.userService.getUserInfo();
    }


    /*
    * Add your pages to be displayed in the menu
    * */
    this.main_pages = [
      { title: '아늑한집', component: HomePage, flag: true, ios:'ios-list', md: 'md-list' }
    ];
    this.build_pages = [
    ];
    this.build_push_pages = [
   //   { title: '찜한 방', component: BuildCaseListPage },
   //   { title: '최근 본 방', component: BuildCaseListPage },
     // { title: '방 리스트 보기', component: BuildCaseListPage, flag: true, ios:'ios-list', md: 'md-list' },
     // { title: '방 정보 등록', component: BuildCaseInputPage, flag: false , ios:'ios-add', md: 'md-add' },
     // { title: '방 검색 설정', component: RoomSettingPage, flag: true, ios:'ios-settings', md: 'md-settings'  }//,
     // { title: '구글 맵', component: GoogleMapsPage, flag:true }
    ];
    this.etc_pages = [
      { title: '1:1 문의 내역', component: QuestionListPage, flag: false , ios:'ios-chatbubbles', md: 'md-chatbubbles'},
      { title: '내 정보 보기', component: UserInfoDetailPage, flag: false , ios:'ios-person', md: 'md-person'}//,
     // { title: '계정 정보 수정', component: UserInfoModifyPage, flag: false, ios:'ios-settings', md: 'md-settings' }
      //{ title: 'CallNumberPage', component: CallNumberPage },
      //{ title: 'ImagePickerPage', component: ImagePickerPage }
    ];


    /*
    * 로그인 이벤트가 발생되었을 경우
    * 메뉴 클래스에서 처리하는 코드.
    * 로그인시 여러개의 이벤트가 발생하지만 메뉴 부분에서 처리하는 것은
    * 아래 코드임.
    * */
    events.subscribe('user:logined', () => {
      console.log("로그인 이벤트 발생");
      this.isLogined =  this.userService.getIsLogind();
      if(this.isLogined) {
        this.user = this.userService.getUserInfo();
      }
    });
    /*
    * 로그아웃 이벤트가 발생되었을 경우.
    * */
    events.subscribe('user:logout', () => {
      this.isLogined = false;
      this.user = null;
    });

    events.subscribe('menu:opened', () => { });
    events.subscribe('menu:closed', () => { });
  }

  /**
   * 메뉴 닫으면 메뉴 닫힘 이벤트를 발생시키는 함수
   * 메뉴 페이지의 생성자에서 처리하고 있음.
   */
  menuClosed() {
    this.events.publish('menu:closed', '');//user:logined
  }

  /**
   * 사용자 세부정보 보기 버튼을 클릭했을 경우 호출되는 함수.
   */
  userInfoDetailBtnClick() {
    this.nav.push(UserInfoDetailPage);
  }

  /**
   * 메뉴 열때 메뉴 열림 이벤트를 발생시키는 함수.
   * 메뉴 페이지의 생성자에서 처리하고 있음.
   */
  menuOpened() {
    this.events.publish('menu:opened', '');

  }

  /**
   * 홈페이지 버튼을 클릭했을 경우 호출되는 함수.
   */
  openHomePage() {
    this.menu.close();
    this.nav.setRoot(HomePage);
  }

  /**
   * 회원가입 페이지를 클릭했을 때 호출되는 함수.
   */
  openResistrationPage() {
    this.nav.push(RegistrationPage);
  }

  /**
   * 로그인 버튼을 클릭했을 때 호출되는 함수.
   */
  openloginPage() {
    this.nav.push(LoginPage);
  }

  /**
   *
   * @param page 특정 페이지를 나타내는 객체
   * 예시) { title: '방 리스트 보기', component: BuildCaseListPage, flag: true }
   * title -> 메뉴 title
   * component -> 페이지 객체
   * flag -> 로그인 필요없이 보이는 메뉴인지의 여부. true면 로그인안해도 보이도록 구현되어 있음.
   *
   * 여기서는 navController가 push 함.
   */
  pushPage(page) {
    this.nav.push(page.component, { user: this.user });
  }

  /**
   *
   * @param page 특정 페이지를 나타내는 객체
   * 예시) { title: '방 리스트 보기', component: BuildCaseListPage, flag: true }
   * title -> 메뉴 title
   * component -> 페이지 객체
   * flag -> 로그인 필요없이 보이는 메뉴인지의 여부. true면 로그인안해도 보이도록 구현되어 있음.
   *
   * 여기서는 navController가 setRoot 함.
   */
  openPage(page) {
    this.nav.setRoot(page.component, {region: "전체"});
  }

  /**
   * 로그아웃 버튼을 클릭했을 경우 실행되는 함수.
   * 내부적으로 userService의 logout함수를 호출한다.
   *
   * userService.logout에서 이벤트를 발생시키고
   * menu부분의 이벤트는 현재 페이지의 클래스 생성자에서 확인할 수 있다.
   */
  logout() {
      this.userService.logout();
  }
}

