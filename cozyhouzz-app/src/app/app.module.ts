import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {AppComponent} from './app.component';
import {AngularFireModule} from 'angularfire2';

// diretives and providers
import {Loader} from '../providers/loader';
import {Nl2br} from '../pipes/nl2br';
import {SortPipe} from '../pipes/SortByJsonObjects';

// Custom pages generated by ionic generator
import {Menu} from '../pages/menu/menu';
import {RoomSettingPage} from '../pages/roomInfo/room-setting/room-setting';
import {HomePage} from '../pages/home/home';
import {UserPage} from '../pages/user/user';
import {QuestionDetailPage} from '../pages/mypage/question/question-detail/question-detail';
import {QuestionListPage} from '../pages/mypage/question/question-list/question-list';
import {RoomInputPage} from '../pages/roomInfo/room-input/room-input';
import { UserInfoDetailPage } from '../pages/mypage/userInfo/user-info-detail/user-info-detail';
import {RoomMapPage} from '../pages/roomInfo/room-map/room-map';
import {DibRoomListPage} from '../pages/roomInfo/dib-room-list/dib-room-list';
// import {LatelyRoomListPage} from '../pages/roomInfo/lately-room-list/lately-room-list';
import {MyPage} from '../pages/mypage/mypage';
import {ConsultingListPage} from '../pages/mypage/consulting/consulting-list/consulting-list';
import {ConsultingDetailPage} from '../pages/mypage/consulting/consulting-detail/consulting-detail';
// import {RoomCommentPage} from '../pages/roomInfo/room-comment/room-comment';
import {NoticeBoardListPage} from '../pages/board/notice-board-list/notice-board-list';
import {NoticeBoardInputPage} from '../pages/board/notice-board-input/notice-board-input';
// Authentication
import {LoginPage} from '../pages/authentication/login/login';
import {RoomListPage} from '../pages/roomInfo/room-list/room-list';
import {RoomDetailPage} from '../pages/roomInfo/room-detail/room-detail';
import {RegistrationPage} from '../pages/authentication/registration/registration';
import {GeneralRegistrationPage} from '../pages/authentication/registration/general-user/registration';
import {BussinessManRegistrationPage} from '../pages/authentication/registration/buisnessman-user/registration';
import {ZipCodePage} from '../pages/function/zip-code/zip-code';
// import {DisqusModule} from "ng2-awesome-disqus";

//BussinessManRegistrationPage
import {Config} from './config'
import {PostService} from "../services/post-service";
import {UserService} from "../services/user-service";
import {Storage} from '@ionic/storage';
import {RoomService} from "../services/room-service";
import {ZipCodeService} from '../services/zip-code-service';
// import {MapsService} from '../services/maps.service';
import {AuthenticatorService} from '../providers/authenticator';

import {TabsPage} from '../pages/tabs/tabs'

//directive
@NgModule({
  declarations: [
    AppComponent,
    Menu,
    LoginPage,
    Nl2br,
    HomePage,
    UserPage,
    //CallNumberPage,
    //ImagePickerPage,
    RoomListPage,
    RoomDetailPage,
    GeneralRegistrationPage,
    BussinessManRegistrationPage,
    RoomSettingPage,
    QuestionDetailPage, // 사실상 채팅!
    QuestionListPage,
    RoomInputPage,
    ZipCodePage,
    // Focuser,
    //GoogleMapsPage,
    UserInfoDetailPage,
    RegistrationPage,
    RoomMapPage,
    SortPipe,
    TabsPage,
    DibRoomListPage,
    //LatelyRoomListPage,
    MyPage,
    ConsultingDetailPage,
    ConsultingListPage,
    // RoomCommentPage,
    NoticeBoardListPage,
    NoticeBoardInputPage
  ],
  imports: [
    IonicModule.forRoot(AppComponent),
    AngularFireModule.initializeApp(Config.FIREBASE_CONFIG)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    Menu,
    LoginPage,
    HomePage,
    UserPage,
    //CallNumberPage,
    //ImagePickerPage,
    RoomListPage,
    RoomDetailPage,
    GeneralRegistrationPage,
    BussinessManRegistrationPage,
    RoomSettingPage,
    QuestionDetailPage,
    QuestionListPage,
    RoomInputPage,
    ZipCodePage,
    //GoogleMapsPage,
    UserInfoDetailPage,
    RegistrationPage,
    RoomMapPage,
    TabsPage,
    DibRoomListPage,
    //LatelyRoomListPage,
    MyPage,
    ConsultingDetailPage,
    ConsultingListPage,
    // RoomCommentPage,
    NoticeBoardListPage,
    NoticeBoardInputPage
  ],
  providers: [
    Loader,
    Storage,
    PostService,
    RoomService,
    UserService,
    ZipCodeService,
    // MapsService,
    AuthenticatorService

  ]
})
export class AppModule {
}
