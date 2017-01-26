import {Component, ViewChild} from '@angular/core';
import {LoginPage} from '../authentication/login/login';
import {QuestionListPage} from '../mypage/question/question-list/question-list';
import {QuestionDetailPage} from '../mypage/question/question-detail/question-detail';

import {UserInfoDetailPage} from '../mypage/userInfo/user-info-detail/user-info-detail';
import {Events, NavController, NavParams, MenuController, AlertController, Content} from "ionic-angular";
import {UserService} from '../../services/user-service';
import {RoomSettingPage} from '../roomInfo/room-setting/room-setting';
import {RegistrationPage} from '../authentication/registration/registration';
import {ConsultingListPage} from '../mypage/consulting/consulting-list/consulting-list';
import {NoticeBoardListPage} from '../board/notice-board-list/notice-board-list';
import {contentHeaders} from '../../app/common/headers';
import {Config} from '../../app/config';
import {config} from "../../app/common/config/index";
import {Loader} from "../../providers/loader";


@Component({
  selector: 'mypage',
  templateUrl: 'mypage.html'
})
export class MyPage {


  // this how you retrieve the Content
  // do not forget to import ViewChild and Content
  @ViewChild(Content) content: Content;


  isLogined: boolean = false;
  user: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page

  pages: Array<{title: string, component: any, flag: boolean, ios: string, md: string, detail: string}>;

  constructor(public userService: UserService, private events: Events,
              public navCtrl: NavController, public params: NavParams, public menu: MenuController,
              public alertCtrl: AlertController, private loader: Loader) {


    /*
     * 반드시 아래 경로 다시 설정해줘야 함.
     * 지금 찜목록이랑 최신 글 보기는 제대로 작동하지 않음.
     * 찜목
     * */
    this.pages = [
      {
        title: '공지사항',
        component: NoticeBoardListPage,
        flag: true,
        ios: 'ios-document',
        md: 'md-document',
        detail: '공지사항을 확인할 수 있습니다.'
      },
      {
        title: '공지사항',
        component: NoticeBoardListPage,
        flag: false,
        ios: 'ios-document',
        md: 'md-document',
        detail: '공지사항을 확인할 수 있습니다.'
      },
      {
        title: '방 검색 설정',
        component: RoomSettingPage,
        flag: true,
        ios: 'ios-settings',
        md: 'md-settings',
        detail: '방 검색 조건을 설정합니다. 보증금, 월세, 방 타입'
      },
      {
        title: '방 검색 설정',
        component: RoomSettingPage,
        flag: false,
        ios: 'ios-settings',
        md: 'md-settings',
        detail: '방 검색 조건을 설정합니다. 보증금, 월세, 방 타입'
      },

      {
        title: '찜 목록',
        component: null,
        flag: true,
        ios: 'ios-heart',
        md: 'md-heart',
        detail: '관심있는 방 또는 인테리어 목록입니다.'
      },
      {
        title: '찜 목록',
        component: null,
        flag: false,
        ios: 'ios-heart',
        md: 'md-heart',
        detail: '관심있는 방 또는 인테리어 목록입니다.'
      },
      /*
       {
       title: '최근 본 방',
       component: null,
       flag: true,
       ios: 'ios-time',
       md: 'md-time',
       detail: '최근에 본 방 또는 인테리어 목록입니다.'
       },
       {
       title: '최근 본 방',
       component: null,
       flag: false,
       ios: 'ios-time',
       md: 'md-time',
       detail: '최근에 본 방 또는 인테리어 목록입니다.'
       },*/
      {title: '로그인', component: LoginPage, flag: true, ios: 'ios-log-in', md: 'md-log-in', detail: '로그인 페이지입니다.'},
      {
        title: '회원가입',
        component: RegistrationPage,
        flag: true,
        ios: 'ios-list',
        md: 'md-list',
        detail: '일반사용자 및 사업주사용자 회원가입'
      },
      {
        title: '1:1 문의 하기',
        component: QuestionListPage,
        flag: false,
        ios: 'ios-chatbubbles',
        md: 'md-chatbubbles',
        detail: '업체 별 1:1 문의 내역을 확인할 수 있습니다.'
      },
      {
        title: '컨설팅 내역',
        component: ConsultingListPage,
        flag: false,
        ios: 'ios-list',
        md: 'md-list',
        detail: '컨설팅 내역을 확인할 수 있습니다.'
      },
      {
        title: '계정 정보 보기',
        component: UserInfoDetailPage,
        flag: false,
        ios: 'ios-person',
        md: 'md-person',
        detail: '계정 상세 보기 및 수정이 가능합니다.'
      }
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
      this.isLogined = false;
      this.user = null;
    });

  }

  ionViewWillEnter() {
    this.menu.enable(false);
    let page = Config.SELECTED_TABS_MENU;
    /*
    * 어떠한 페이지를 push 해줄 것인가를 확인하는 부분.
    * 아래의 if문을 보면 이해가 갈것이다.*/
    if (page != null) {
      if (page == 'RegisterPage') this.navCtrl.push(RegistrationPage);
      else if (page == 'LoginPage') this.navCtrl.push(LoginPage);
      else if (page == 'QuestionListPage') this.navCtrl.push(QuestionListPage);
      else if (page == 'UserInfoDetailPage') this.navCtrl.push(UserInfoDetailPage);
      else if (page == 'NoticeBoardListPage') this.navCtrl.push(NoticeBoardListPage);
      else if (page == 'RoomSettingPage') this.navCtrl.push(RoomSettingPage);
      else if (page == 'UserInfoDetailPage') this.navCtrl.push(UserInfoDetailPage);

      /*
      * 적절한 처리를 해주었다면
      * 다음에 해당 변수를 사용할 수 있도록 null 로 처리해준다. */
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
    console.log(p.title);
    if (p.title == '찜 목록') {
      this.navCtrl.parent.select(2);
    } /*else if (p.title == '최근 본 방') {
     this.navCtrl.parent.select(3);
     }*/ else {
      this.navCtrl.push(p.component);
    }
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

  /**
   * 회원탈퇴를 처리하는 함수
   */
  signOut() {
    let user = {
      email: this.user.email
    };
    /*
     * 헤더에 jwt 토큰을 추가한다. */
    contentHeaders.set('Authorization', this.userService.getJwtToken());//Header에 jwt값 추가하기

    /*
     * 사용자에게 한번 더 물어보는 부분. */
    let alert = this.alertCtrl.create({
      title: '회원탈퇴',
      message: '회원탈퇴를 하시겠습니까?<br> 개인 정보는 삭제되며 한번 삭제된 정보는 복구가 불가능합니다.',
      buttons: [
        {
          text: '취소',
          role: '취소',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '회원탈퇴',
          handler: () => {
            /*
             * 실제로 회원탈퇴가 이루어지는 부분.
             * loader을 발생하고 서버에 user 정보를 헤더와 함께 보낸다. */
            this.loader.show("회원 탈퇴 중 입니다.");
            this.userService.signOut(user, contentHeaders).toPromise()
              .then(
                response => {
                  /*
                   * 회원탈퇴가 제대로 된 경우.
                   * 로더를 숨기고
                   * 로그아웃 처리를 한다. -> 앞으론 로그인 부분에서 막힘. */
                  console.log(response);
                  this.loader.hide();
                  this.userService.logout();

                }, error => {
                  /*
                   * 에러가 발생한 경우.
                   * 적절하게 사용자에게 에러를 띄워줘야 하나 아직 하지 못함.
                   * 나중에 본 사람이 잘 추가시킬것.*/
                  this.loader.hide();
                  console.log(error);
                }
              );
          }
        }
      ]
    });
    alert.present();
  }
}
