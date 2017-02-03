"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var tabs_1 = require('../tabs/tabs');
var config_1 = require('../../app/config');
var Menu = (function () {
    function Menu(navCtrl, events, viewController, userService, menu) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.events = events;
        this.viewController = viewController;
        this.userService = userService;
        this.menu = menu;
        this.isLogined = false;
        this.rootPage = tabs_1.TabsPage;
        this.isLogined = this.userService.getIsLogind();
        if (this.isLogined) {
            this.user = this.userService.getUserInfo();
        }
        /*
        * 사이드 메뉴에 띄울 것들을 가지고 있는 배열
        * 로그인/로그아웃 모두 띄워줘야 하는 것들은
        * flag의 값만 반대로 하여 2개씩 작성해 주어야 한다.
        *
        * 나중에 잘 줄여 봐야 함. */
        this.pages = [
            {
                title: '공지사항',
                flag: true,
                ios: 'ios-document',
                md: 'md-document',
                page: 'NoticeBoardListPage'
            },
            {
                title: '공지사항',
                flag: false,
                ios: 'ios-document',
                md: 'md-document',
                page: 'NoticeBoardListPage'
            },
            {
                title: '방 보기',
                flag: true,
                ios: 'ios-list',
                md: 'md-list',
                page: 'RoomListPage'
            },
            {
                title: '방 보기',
                flag: false,
                ios: 'ios-list',
                md: 'md-list',
                page: 'RoomListPage'
            },
            {
                title: '방 검색 설정',
                flag: true,
                ios: 'ios-settings',
                md: 'md-settings',
                page: 'RoomSettingPage'
            },
            {
                title: '방 검색 설정',
                flag: false,
                ios: 'ios-settings',
                md: 'md-settings',
                page: 'RoomSettingPage'
            },
            {
                title: '찜 목록',
                flag: true,
                ios: 'ios-heart',
                md: 'md-heart',
                page: 'DibRoomListPage'
            },
            {
                title: '찜 목록',
                flag: false,
                ios: 'ios-heart',
                md: 'md-heart',
                page: 'DibRoomListPage'
            } /*,
      
            {
              title: '최근 본 방',
              flag: true,
              ios: 'ios-time',
              md: 'md-time',
              page: 'LatelyRoomListPage'
            },
            {
              title: '최근 본 방',
              flag: false,
              ios: 'ios-time',
              md: 'md-time',
              page: 'LatelyRoomListPage'
            }*/
        ];
        /*
         * Add your pages to be displayed in the menu
         * */
        this.etc_pages = [
            {
                title: '1:1 문의 내역',
                flag: false,
                ios: 'ios-chatbubbles',
                md: 'md-chatbubbles',
                page: 'QuestionListPage'
            },
            {
                title: '내 정보 보기',
                flag: false,
                ios: 'ios-person',
                md: 'md-person',
                page: 'UserInfoDetailPage'
            } //,
        ];
        /*
         * 로그인 이벤트가 발생되었을 경우
         * 메뉴 클래스에서 처리하는 코드.
         * 로그인시 여러개의 이벤트가 발생하지만 메뉴 부분에서 처리하는 것은
         * 아래 코드임.
         * */
        events.subscribe('user:logined', function () {
            console.log("로그인 이벤트 발생");
            _this.isLogined = _this.userService.getIsLogind();
            if (_this.isLogined) {
                _this.user = _this.userService.getUserInfo();
            }
        });
        /*
         * 로그아웃 이벤트가 발생되었을 경우.
         * */
        events.subscribe('user:logout', function () {
            _this.isLogined = false;
            _this.user = null;
        });
        events.subscribe('menu:opened', function () {
            /*
              let element: HTMLElement = document.getElementById('roomInfoListContent');
              element.getElementsByClassName('scroll-content')[0].setAttribute('style', "margin-top: 103px;");
             */
        });
        events.subscribe('menu:closed', function () {
        });
    }
    /**
     * 메뉴 닫으면 메뉴 닫힘 이벤트를 발생시키는 함수
     * 메뉴 페이지의 생성자에서 처리하고 있음.
     */
    Menu.prototype.menuClosed = function () {
        this.events.publish('menu:closed', ''); //user:logined
    };
    /**
     * 사용자 세부정보 보기 버튼을 클릭했을 경우 호출되는 함수.
     */
    /*
      userInfoDetailBtnClick() {
      this.nav.push(UserInfoDetailPage);
    }*/
    /**
     * 메뉴 열때 메뉴 열림 이벤트를 발생시키는 함수.
     * 메뉴 페이지의 생성자에서 처리하고 있음.
     */
    Menu.prototype.menuOpened = function () {
        this.events.publish('menu:opened', '');
    };
    /**
     * 홈페이지 버튼을 클릭했을 경우 호출되는 함수.
     */
    /*
      openHomePage() {
      this.menu.close();
      this.nav.setRoot(HomePage);
    }*/
    /**
     * 회원가입 페이지를 클릭했을 때 호출되는 함수.
     */
    Menu.prototype.openResistrationPage = function () {
        this.menu.close();
        config_1.Config.SELECTED_TABS_MENU = 'RegisterPage';
        this.nav._children[0].select(3);
        // this.nav.push(RegistrationPage);
    };
    /**
     * 로그인 버튼을 클릭했을 때 호출되는 함수.
     */
    Menu.prototype.openloginPage = function () {
        this.menu.close();
        config_1.Config.SELECTED_TABS_MENU = 'LoginPage';
        this.nav._children[0].select(3);
        //this.nav.push(LoginPage);
    };
    /**
     * 특정 페이지로 보내는 함수.
     * 뭐가 문제냐면 기존의 navController이 아닌 tab을 사용하기  때문에
     * select를 사용해서 해줘야 함.
     *
     * 찜 목록은 select(2)
     * 방 목록은 select(1)
     * 나머지는 전부다 select(3)으로 보내줘야 한다.
     *
     * 근데 여기서 Config.SELECTED_TABS_MENU가 뭐냐면
     * 해당 탭으로 이동해서 어떠한 페이지를 push할 것인가를 나타낸다.
     *
     * 정 모르겠다면 mypage.ts 파일을 보자.
     * @param page
     */
    Menu.prototype.pushPage = function (page) {
        this.menu.close();
        if (page.page == 'DibRoomListPage') {
            this.nav._children[0].select(2);
        } /* else if(page.page == 'LatelyRoomListPage') {
          this.nav._children[0].select(3);
        }*/
        else if (page.page == 'RoomListPage') {
            this.nav._children[0].select(1);
        }
        else {
            config_1.Config.SELECTED_TABS_MENU = page.page;
            this.nav._children[0].select(3);
        }
    };
    /**
     *
     * @param page 특정 페이지를 나타내는 객체
     * 예시) { title: '방 리스트 보기', component: RoomListPage, flag: true }
     * title -> 메뉴 title
     * component -> 페이지 객체
     * flag -> 로그인 필요없이 보이는 메뉴인지의 여부. true면 로그인안해도 보이도록 구현되어 있음.
     *
     * 여기서는 navController가 setRoot 함.
     */
    Menu.prototype.openPage = function (page) {
        this.menu.close();
        this.nav.setRoot(page.component, { region: "전체" });
    };
    /**
     * 로그아웃 버튼을 클릭했을 경우 실행되는 함수.
     * 내부적으로 userService의 logout함수를 호출한다.
     *
     * userService.logout에서 이벤트를 발생시키고
     * menu부분의 이벤트는 현재 페이지의 클래스 생성자에서 확인할 수 있다.
     */
    Menu.prototype.logout = function () {
        this.userService.logout();
    };
    __decorate([
        core_1.ViewChild(ionic_angular_1.Nav)
    ], Menu.prototype, "nav", void 0);
    Menu = __decorate([
        core_1.Component({
            selector: 'page-menu',
            templateUrl: 'menu.html'
        })
    ], Menu);
    return Menu;
}());
exports.Menu = Menu;
