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
import {RoomSettingPage} from '../pages/mypage/room/room-info/setting';
import {HomePage} from '../pages/home/home';
import {UserPage} from '../pages/user/user';
import {QuestionDetailPage} from '../pages/mypage/question/question-detail/question-detail';
import {QuestionListPage} from '../pages/mypage/question/question-list/question-list';
import {CallNumberPage} from '../pages/function/call-number/call-number';
import {ImagePickerPage} from '../pages/function/image-picker/image-picker';
import {BuildCaseInputPage} from '../pages/buildCase/build-case-input/build-case-input';
import {ZipCodePage} from '../pages/function/zip-code/zip-code';
import {GoogleMapsPage} from '../pages/function/google-maps/google-maps';
import {UserInfoModifyPage} from '../pages/mypage/userInfo/user-info-modify/user-info-modify';
import { UserInfoDetailPage } from '../pages/mypage/userInfo/user-info-detail/user-info-detail';
import {BuildCaseMapPage} from '../pages/buildCase/build-case-map/build-case-map';
// Authentication
import {LoginPage} from '../pages/authentication/login/login';
import {BuildCaseListPage} from '../pages/buildCase/build-case-list/build-case-list';
import {BuildCaseDetailPage} from '../pages/buildCase/build-case-detail/build-case-detail';
import {RegistrationPage} from '../pages/authentication/registration/registration';
import {GeneralRegistrationPage} from '../pages/authentication/registration/general-user/registration';
import {BussinessManRegistrationPage} from '../pages/authentication/registration/buisnessman-user/registration';
//BussinessManRegistrationPage
import {Config} from './config'
import {PostService} from "../services/post-service";
import {UserService} from "../services/user-service";
import {Storage} from '@ionic/storage';
import {RoomService} from "../services/room-service";
import {ZipCodeService} from '../services/zip-code-service';
import {MapsService} from '../services/maps.service';
import {AuthenticatorService} from '../providers/authenticator';


//directive
import {Focuser} from '../components/focuser/focuser';
@NgModule({
  declarations: [
    AppComponent,
    Menu,
    LoginPage,
    Nl2br,
    HomePage,
    UserPage,
    CallNumberPage,
    ImagePickerPage,
    BuildCaseListPage,
    BuildCaseDetailPage,
    GeneralRegistrationPage,
    BussinessManRegistrationPage,
    RoomSettingPage,
    QuestionDetailPage, // 사실상 채팅!
    QuestionListPage,
    BuildCaseInputPage,
    ZipCodePage,
    Focuser,
    GoogleMapsPage,
    UserInfoModifyPage,
    UserInfoDetailPage,
    RegistrationPage,
    BuildCaseMapPage,
    SortPipe
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
    CallNumberPage,
    ImagePickerPage,
    BuildCaseListPage,
    BuildCaseDetailPage,
    GeneralRegistrationPage,
    BussinessManRegistrationPage,
    RoomSettingPage,
    QuestionDetailPage,
    QuestionListPage,
    BuildCaseInputPage,
    ZipCodePage,
    GoogleMapsPage,
    UserInfoModifyPage,
    UserInfoDetailPage,
    RegistrationPage,
    BuildCaseMapPage
  ],
  providers: [
    Loader,
    Storage,
    PostService,
    RoomService,
    UserService,
    ZipCodeService,
    MapsService,
    AuthenticatorService
  ]
})
export class AppModule {
}
