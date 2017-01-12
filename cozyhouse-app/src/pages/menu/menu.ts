import { Component, ViewChild } from '@angular/core';
import { Nav, ViewController } from 'ionic-angular';
import { SettingsPage } from './settings/settings';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';
import { BuildCaseListPage } from '../buildCase/build-case-list/build-case-list';
import { GeneralRegistrationPage } from '../authentication/registration/general-user/registration';
import { BussinessManRegistrationPage } from '../authentication/registration/buisnessman-user/registration';
import { CallNumberPage } from '../call-number/call-number';
import { ImagePickerPage } from '../image-picker/image-picker';
import { LoginPage } from '../authentication/login/login'
import { ModalController, NavController } from 'ionic-angular';
import { AuthenticatorService } from '../../providers/authenticator';
import { Events } from 'ionic-angular';
import { User } from "../../providers/user";
import { RoomSettingPage } from '../setting/room-info/setting';
import { QuestionDetailPage } from '../mypage/question/question-detail/question-detail';
import { QuestionListPage } from '../mypage/question/question-list/question-list';
import { UserService } from '../../services/user-service';
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
  providers: [AuthenticatorService]
})
export class Menu {
  @ViewChild(Nav) nav: Nav;
  isLogined:boolean = false;
  userDetails: User = null;
  user:User;
  rootPage: any = HomePage;
  build_pages: Array<{title: string, component: any}>;
  build_push_pages: Array<{title: string, component: any}>;
  main_pages: Array<{title: string, component: any}>;
  etc_pages: Array<{title: string, component: any}>;
  viewController: ViewController;
  userService:UserService;
  constructor(
    public navCtrl: NavController,
    private authenticatorService: AuthenticatorService,
    public events: Events,
    public v: ViewController,
    public UserService: UserService
  ) {
    this.userService = UserService;
    this.viewController = v;
    this.authenticatorService = authenticatorService;
    this.navCtrl = navCtrl;
    this.events = events;

    console.log("메뉴 생성자");
    this.isLogined =  this.userService.getIsLogind();
    if(this.isLogined) {
      this.user = this.userService.getUserInfo();
    }


    // Add your pages to be displayed in the menu
    this.main_pages = [
      { title: '아늑한집', component: HomePage}
    ];
    this.build_pages = [
      { title: '방 리스트 보기', component: BuildCaseListPage }
    ];
    this.build_push_pages = [
   //   { title: '찜한 방', component: BuildCaseListPage },
   //   { title: '최근 본 방', component: BuildCaseListPage },
      { title: '방정보 입력', component: RoomSettingPage }
    ];
    this.etc_pages = [
      { title: '1:1 문의', component: QuestionListPage },
      { title: '개인정보수정', component: SettingsPage }
      //{ title: 'CallNumberPage', component: CallNumberPage },
      //{ title: 'ImagePickerPage', component: ImagePickerPage }
    ];



    events.subscribe('user:logined', () => {
      console.log("로그인 이벤트 발생");
      this.isLogined =  this.userService.getIsLogind();
      if(this.isLogined) {
        this.user = this.userService.getUserInfo();
      }
    });
    events.subscribe('user:logout', () => {
      this.isLogined = false;
      this.userDetails = null;
      this.UserService.removeUserInfo();
    });

    events.subscribe('menu:opened', () => {
      console.log("menu:opened");
    });

    events.subscribe('menu:closed', () => {

    });
  }
  ionViewWillLoad() {
    console.log("ionViewWillLoad");
  }
  ionViewLoaded() {
    console.log("ionViewLoaded");
  }
  menuClosed() {
    this.events.publish('menu:closed', '');//user:logined
  }

  menuOpened() {
    this.events.publish('menu:opened', '');

  }

  openloginPage() {
    this.nav.push(LoginPage);
  }
  pushPage(page) {
    this.nav.push(page.component, { user: this.userDetails });
  }
  openPage(page) {
    // 메뉴에서 다른 페이지 불러올대 파라미터 보내는 부분임!!!!!!!!!!!!!!!!!!!!!!!!1
    // 반드시 수정해야 함.
    this.nav.setRoot(page.component, {region: "전체"});
  }
// on click, go to user timeline
  viewUser(userId) {
    this.nav.push(UserPage, {id: userId})
  }
  genaral_signup() {
     this.nav.push(GeneralRegistrationPage);
  }
  bussinessman_signup() {
      this.nav.push(BussinessManRegistrationPage);
  }
  logout() {
    this.events.publish('user:logout', '');//user:logined
  }
}

