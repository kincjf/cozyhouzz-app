import {Component} from '@angular/core';
import {QuestionListPage} from '../mypage/question/question-list/question-list';
import {UserInfoDetailPage} from '../mypage/userInfo/user-info-detail/user-info-detail';
import {LoginPage} from '../authentication/login/login';
import {Events, NavController, NavParams, MenuController, AlertController} from "ionic-angular";
import {UserService} from '../../services/user-service';
import {RoomSettingPage} from './room/room-info/setting';
import {RegistrationPage} from '../authentication/registration/registration';
import {ConsultingListPage} from '../mypage/consulting/consulting-list/consulting-list';

import {Config} from '../../app/config';
@Component({
  selector: 'mypage',
  templateUrl: 'mypage.html'
})
export class MyPage {
  isLogined: boolean = false;
  user: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page

  pages: Array<{title: string, component: any, flag: boolean, ios: string, md: string, detail: string}>;

  constructor(public userService: UserService, private events: Events,
              public navCtrl: NavController, public params: NavParams, public menu:MenuController,
              public alertCtrl: AlertController) {


    this.pages = [
      {title: '방 검색 설정', component: RoomSettingPage, flag: true, ios: 'ios-settings', md: 'md-settings', detail: '방 검색 조건을 설정합니다. 보증금, 월세, 방 타입'},
      {title: '방 검색 설정', component: RoomSettingPage, flag: false, ios: 'ios-settings', md: 'md-settings', detail: '방 검색 조건을 설정합니다. 보증금, 월세, 방 타입'},

      {title: '찜 목록', component: RoomSettingPage, flag: true, ios: 'ios-heart', md: 'md-heart', detail: '관심있는 방 또는 인테리어 목록입니다.'},
      {title: '찜 목록', component: RoomSettingPage, flag: false, ios: 'ios-heart', md: 'md-heart', detail: '관심있는 방 또는 인테리어 목록입니다.'},

      {title: '최근 본 방', component: RoomSettingPage, flag: true, ios: 'ios-time', md: 'md-time', detail: '최근에 본 방 또는 인테리어 목록입니다.'},
      {title: '최근 본 방', component: RoomSettingPage, flag: false, ios: 'ios-time', md: 'md-time', detail: '최근에 본 방 또는 인테리어 목록입니다.'},
      {title: '로그인', component: LoginPage, flag: true, ios: 'ios-log-in', md: 'md-log-in', detail: '로그인 페이지입니다.'},
      {title: '회원가입', component: RegistrationPage, flag: true, ios: 'ios-list', md: 'md-list', detail: '일반사용자 및 사업주사용자 회원가입'},
      {title: '1:1 문의 하기', component: QuestionListPage, flag: false, ios: 'ios-chatbubbles', md: 'md-chatbubbles', detail: '업체 별 1:1 문의 내역을 확인할 수 있습니다.'},
      {title: '컨설팅 내역', component: ConsultingListPage, flag: false, ios: 'ios-list', md: 'md-list', detail: '컨설팅 내역을 확인할 수 있습니다.'},
      {title: '계정 정보 보기', component: UserInfoDetailPage, flag: false, ios: 'ios-person', md: 'md-person', detail: '계정 상세 보기 및 수정이 가능합니다.'}
    ];

    events.subscribe('mypage:logined', () => {
      console.log("로그인 이벤트 발생");
      this.isLogined = this.userService.getIsLogind();
      if (this.isLogined) {
        this.user = this.userService.getUserInfo();
      }
    });
    /*
     * 로그아웃 이벤트가 발생되었을 경우.
     * */
    events.subscribe('mypage:logout', () => {
      console.log("dsfsdfdsf");
      this.isLogined = false;
      this.user = null;
    });

  }

  ionViewWillEnter() {
    this.menu.enable(false);
    let page = Config.SELECTED_TABS_MENU;
    if (page != null) {
      if (page == 'RegisterPage') {

        this.navCtrl.push(RegistrationPage);
      } else if (page == 'LoginPage') {
        this.navCtrl.push(LoginPage);

      } else if(page =='QuestionListPage') {
        this.navCtrl.push(QuestionListPage);

      }else if(page =='UserInfoDetailPage') {
        this.navCtrl.push(UserInfoDetailPage);

      }
      Config.SELECTED_TABS_MENU = null;
    }
  }
  ionViewWillLeave() {

    this.menu.enable(true);
  }
  ionViewDidLoad() {
    this.isLogined = this.userService.getIsLogind();
    if (this.isLogined) {
      this.user = this.userService.getUserInfo();
    }
  }

  openPage(p) {
    this.navCtrl.push(p);
    /*
     this.navCtrl.parent.parent.push(p);
     */
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: '로그아웃',
      message: '로그아웃 하시겠습니까?',
      buttons: [
        {
          text: '취소',
          role: '취소',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '로그아웃',
          handler: () => {
            this.userService.logout();
          }
        }
      ]
    });
    alert.present();
  }
}
