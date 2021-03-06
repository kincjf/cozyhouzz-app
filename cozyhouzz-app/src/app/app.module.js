"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var app_component_1 = require('./app.component');
// diretives and providers
var loader_1 = require('../providers/loader');
var nl2br_1 = require('../pipes/nl2br');
var SortByJsonObjects_1 = require('../pipes/SortByJsonObjects');
var moment_module_1 = require('angular2-moment/moment.module');
// Custom pages generated by ionic generator
var menu_1 = require('../pages/menu/menu');
var room_setting_1 = require('../pages/roomInfo/room-setting/room-setting');
var home_1 = require('../pages/home/home');
var user_1 = require('../pages/user/user');
var question_detail_1 = require('../pages/mypage/question/question-detail/question-detail');
var question_list_1 = require('../pages/mypage/question/question-list/question-list');
var room_input_1 = require('../pages/roomInfo/room-input/room-input');
var user_info_detail_1 = require('../pages/mypage/userInfo/user-info-detail/user-info-detail');
var room_map_1 = require('../pages/roomInfo/room-map/room-map');
var dib_room_list_1 = require('../pages/roomInfo/dib-room-list/dib-room-list');
// import {LatelyRoomListPage} from '../pages/roomInfo/lately-room-list/lately-room-list';
var mypage_1 = require('../pages/mypage/mypage');
var consulting_list_1 = require('../pages/mypage/consulting/consulting-list/consulting-list');
var consulting_detail_1 = require('../pages/mypage/consulting/consulting-detail/consulting-detail');
// import {RoomCommentPage} from '../pages/roomInfo/room-comment/room-comment';
var notice_board_list_1 = require('../pages/board/notice-board-list/notice-board-list');
var notice_board_input_1 = require('../pages/board/notice-board-input/notice-board-input');
// Authentication
var login_1 = require('../pages/authentication/login/login');
var room_list_1 = require('../pages/roomInfo/room-list/room-list');
var room_detail_1 = require('../pages/roomInfo/room-detail/room-detail');
var registration_1 = require('../pages/authentication/registration/registration');
var registration_2 = require('../pages/authentication/registration/general-user/registration');
var registration_3 = require('../pages/authentication/registration/buisnessman-user/registration');
var zip_code_1 = require('../pages/function/zip-code/zip-code');
// import {DisqusModule} from "ng2-awesome-disqus";
var ion_shrinking_header_1 = require('../components/ion-shrinking-header');
//BussinessManRegistrationPage
var post_service_1 = require("../services/post-service");
var user_service_1 = require("../services/user-service");
var storage_1 = require('@ionic/storage');
var room_service_1 = require("../services/room-service");
var zip_code_service_1 = require('../services/zip-code-service');
// import {MapsService} from '../services/maps.service';
var tabs_1 = require('../pages/tabs/tabs');
var globalvars_1 = require("../providers/globalvars");
//directive
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                menu_1.Menu,
                login_1.LoginPage,
                nl2br_1.Nl2br,
                home_1.HomePage,
                user_1.UserPage,
                //CallNumberPage,
                //ImagePickerPage,
                room_list_1.RoomListPage,
                room_detail_1.RoomDetailPage,
                registration_2.GeneralRegistrationPage,
                registration_3.BussinessManRegistrationPage,
                room_setting_1.RoomSettingPage,
                question_detail_1.QuestionDetailPage,
                question_list_1.QuestionListPage,
                room_input_1.RoomInputPage,
                zip_code_1.ZipCodePage,
                // Focuser,
                //GoogleMapsPage,
                user_info_detail_1.UserInfoDetailPage,
                registration_1.RegistrationPage,
                room_map_1.RoomMapPage,
                SortByJsonObjects_1.SortPipe,
                tabs_1.TabsPage,
                dib_room_list_1.DibRoomListPage,
                //LatelyRoomListPage,
                mypage_1.MyPage,
                consulting_detail_1.ConsultingDetailPage,
                consulting_list_1.ConsultingListPage,
                // RoomCommentPage,
                notice_board_list_1.NoticeBoardListPage,
                notice_board_input_1.NoticeBoardInputPage,
                ion_shrinking_header_1.IonShrinkingHeader
            ],
            imports: [
                /*
                * animate -> 안드로이드 특유의 애니메이션 효과를 줄것인가 안줄것인가.
                * scrollAssist, autoFocusAssist -> 인풋 태그에 onfocus 일경우, 스크롤 자동으로 올릴 것인가 .
                * */
                //IonicModule.forRoot(AppComponent,  { animate: false }),
                ionic_angular_1.IonicModule.forRoot(app_component_1.AppComponent, { scrollAssist: false, autoFocusAssist: false }),
                //AngularFireModule.initializeApp(Config.FIREBASE_CONFIG),
                moment_module_1.MomentModule,
            ],
            bootstrap: [ionic_angular_1.IonicApp],
            entryComponents: [
                app_component_1.AppComponent,
                menu_1.Menu,
                login_1.LoginPage,
                home_1.HomePage,
                user_1.UserPage,
                //CallNumberPage,
                //ImagePickerPage,
                room_list_1.RoomListPage,
                room_detail_1.RoomDetailPage,
                registration_2.GeneralRegistrationPage,
                registration_3.BussinessManRegistrationPage,
                room_setting_1.RoomSettingPage,
                question_detail_1.QuestionDetailPage,
                question_list_1.QuestionListPage,
                room_input_1.RoomInputPage,
                zip_code_1.ZipCodePage,
                //GoogleMapsPage,
                user_info_detail_1.UserInfoDetailPage,
                registration_1.RegistrationPage,
                room_map_1.RoomMapPage,
                tabs_1.TabsPage,
                dib_room_list_1.DibRoomListPage,
                //LatelyRoomListPage,
                mypage_1.MyPage,
                consulting_detail_1.ConsultingDetailPage,
                consulting_list_1.ConsultingListPage,
                // RoomCommentPage,
                notice_board_list_1.NoticeBoardListPage,
                notice_board_input_1.NoticeBoardInputPage
            ],
            providers: [
                loader_1.Loader,
                storage_1.Storage,
                post_service_1.PostService,
                room_service_1.RoomService,
                user_service_1.UserService,
                zip_code_service_1.ZipCodeService,
                // MapsService,
                globalvars_1.GlobalVars
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
