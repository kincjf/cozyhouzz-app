import {Component, ViewChild} from '@angular/core';
import {NavController, AlertController, NavParams, Events, Slides, Platform, App} from 'ionic-angular';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Loader} from "../../../providers/loader";
import {Md5} from "ts-md5/dist/md5";
import {QuestionDetailPage} from '../../mypage/question/question-detail/question-detail';

import 'rxjs/add/operator/toPromise';
import {Http} from '@angular/http';
import {config} from '../../../app/common/config';
import {STATIC_VALUE} from "../../../app/common/config/staticValue";
import * as _ from "lodash";
import * as moment from 'moment';
import {PostService} from '../../../services/post-service';
import {IMarker, IPoint} from './interfaces';
import {CallNumber} from 'ionic-native';
import {RoomMapPage} from '../room-map/room-map';
import {isCordovaAvailable} from '../../../services/is-cordova-available';
import {contentHeaders} from '../../../app/common/headers';
import {UserService} from '../../../services/user-service';
import {Config} from "../../../app/config";
// import {RoomCommentPage} from '../room-comment/room-comment';
@Component({
  selector: 'page-build-case-detail',
  templateUrl: 'room-detail.html',
})
export class RoomDetailPage {
  @ViewChild('informationSlides') slides: Slides;

  public post: any;
  public data: any;
  public roomDetailInfo:any;
  buildType: string;
  buildPlace: any;
  buildName: any;
  buildAddress: any;
  buildTotalArea: number;
  mainPreviewImage: string;
  buildTotalPrice: number;
  htmlText: any;
  VRImages: any;
  regionCategory: any;
  initWriteDate: string;

  vrImageURL: SafeResourceUrl;

  memberIdx: number;
  companyName: string;
  ownerName: string;
  mainWorkField: string;
  mainWorkArea: string;
  workPlace: string;
  contact: string;
  companyIntroImage: string;
  serverHost: string = config.serverHost;
  companyIntroImageUrl;

  ID: any;
  address: any;
  area_size: any;
  content: any;
  coordinate: any;
  createdAt: any;
  deposit: any;
  display_name: any;
  email: any;
  like: any;
  locale: any;
  meta_value: any;
  monthly_rent_fee: any;
  old_address: any;
  old_address_dong: any;
  post_code: any;
  post_id: any;
  post_init_date: any;
  post_init_date_gmt: any;
  post_modified_date: any;
  post_modified_date_gmt: any;
  post_status: any;
  post_type: any;
  read_count: any;
  room_type: any;
  thumbnail_image_path: any;
  thumbnail_media_id: any;
  title: any;
  unlike: any;
  updatedAt: any;
  user_id: any;
  telephone: any;

  informationSlides: Slides;
  informationSlides_index:number = 0;

  buildTypes = STATIC_VALUE.PLACE_TYPE;
  selectedroomInfoIdx: any;
  public roomInfoResult: any;

  private jwt:string;
  private isLogined:boolean;
  private user: any;

  constructor(public nav: NavController, public postService: PostService, public http: Http, public params: NavParams,
              private alertCtrl: AlertController, private sanitizer: DomSanitizer, public loader:Loader,
              public userService:UserService,    private events: Events, public platform: Platform, public app:App) {

    this.informationSlides_index = 0;
    this.isLogined = false;
    /*
     * 선택된 방 정보를 가져온다.
     * 이는 RoomListPage에서 navCtroller가 page를 push할 때 같이 넘겨준 값.
     * */
    this.selectedroomInfoIdx = params.get("selectedroomInfoIdx");
    this.post = postService.getItem(0); //해당 문장은 추후 지워야 됨.
    /*
     * 로딩화면을 띄우고 서버로부터 데이터를 가져오는 부분.
     * 현재는 그냥 url로 되어있지만 config에서 url을 설정해서 추후 바꿔야 함.
     * */
    this.loader.show("정보를 불러오고 있습니다.");
    let URL = [config.serverHost, config.path.roomDetailInfo, this.selectedroomInfoIdx ].join('/');
  console.log(URL);
    this.vrImageURL = sanitizer.bypassSecurityTrustResourceUrl('http://cozyhouzz.npus.me:3000/roomInfoVR/6');
    this.roomInfoResult = postService.getroomInfoInfo(URL);
    this.roomInfoResult.toPromise()
      .then(
        response => {
          let postInfoData = response.detailList[0];
            this.ID= postInfoData.ID;
            this.address= JSON.parse(postInfoData.address);
            this.area_size=postInfoData.area_size;
            this.content = postInfoData.content;
            this.coordinate= JSON.parse(postInfoData.coordinate);
            this.createdAt= postInfoData.createAt;
            this.deposit= postInfoData.deposit;
            this.display_name=postInfoData.display_name;
            this.email=postInfoData.email;
            this.like=postInfoData.like;
            this.locale=postInfoData.local;
            this.telephone = postInfoData.telephone;
            this.meta_value= JSON.parse(postInfoData.meta_value);
            this.monthly_rent_fee=postInfoData.monthly_rent_fee;
            this.old_address= JSON.parse(postInfoData.old_address);
            this.old_address_dong=postInfoData.old_address_dong;
            this.post_code=postInfoData.post_code;
            this.post_id=postInfoData.post_id;
            this.post_init_date=postInfoData.post_init_date;
            this.post_init_date_gmt=postInfoData.post_init_date_gmt;
            this.post_modified_date=postInfoData.post_modified_date;
            this.post_modified_date_gmt=postInfoData.post_modified_date_gmt;
            this.post_status=postInfoData.post_status;
            this.post_type=postInfoData.post_type;
            this.read_count=postInfoData.read_count;
            this.room_type= '원룸';//this.buildTypeFuntion(postInfoData.room_type);
            this.thumbnail_image_path=postInfoData.thumbnail_image_path;
            this.thumbnail_media_id=postInfoData.thumbnail_media_id;
            this.title=postInfoData.title;
            this.unlike=postInfoData.unlike;
            this.updatedAt=postInfoData.updateAt;
            this.user_id=postInfoData.user_id;
          loader.hide();
        }
      );

    this.isLogined = userService.getIsLogind();
    if(this.isLogined) {
      this.jwt = userService.getJwtToken();
      this.user = userService.getUserInfo();
    }
    contentHeaders.set('Authorization', this.jwt);//Header에 jwt값 추가하기


    events.subscribe('roomInfoDetail:logined', () => {
      this.isLogined = userService.getIsLogind();
      if (this.isLogined) {
        this.user = this.userService.getUserInfo();
      }
    });
    /*
     * 로그아웃 또한 로그인과 마찬가지
     * */
    events.subscribe('roomInfoDetail:logout', () => {
      this.isLogined = false;
      this.user = null;
      this.userService.removeUserInfo();
    });

  };
  ionViewWillEnter() {
    //this.collectionsCommentsCtrl();
    //this.collectionsCommentsCtrl();
  }
  ionViewDidLoad() {
    console.log(this.slides);
    //this.collectionsCommentsCtrl();



  }
  /**
   * 전화하기 버튼을 클릭했을 때 호출되는 함수.
   * native 기능이기 때문에 핸드폰에서 실행되고 있는가를 isCordovaAvailable함수를 통해서 확인한다.
   * native일 경우, alertCtrl을 이용해서 요금 부과를 확인하고 전화걸기를 수행한다.
   * ionic plugin add call-number 필수! */
  callNumber(telephone) {
    if (!isCordovaAvailable()) {
      return false;
    }
    let alert = this.alertCtrl.create({
      title: '010-3326-7822',
      message: '정말 전화를 거시겠습니까? 요금제에 따라 요금이 부과될 수 있습니다.',
      buttons: [
        {
          text: '취소',
          role: '취소',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '전화걸기',
          handler: () => {
            CallNumber.callNumber('010-3326-7822', true).then(() => console.log('Launched dialer!'));
          }
        }
      ]
    });
    alert.present();
  }

/*
  collectionsCommentsCtrl() {
    var disqus_config = function () {
      this.page.url = 'cozyhouzz.npus.megfgfg';  // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = 'cozyhouzz.npus.me333'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };

    (function() {
      var d = document, s = d.createElement('script');
      s.src = '//npus-kr.disqus.com/embed.js';
      s.setAttribute('data-timestamp', (new Date()).toString());
      (d.head || d.body).appendChild(s);
    })();
  }*/


  /**
   * 지도보기 버튼을 클릭했을 때 호출되는 함수
   * 현재는 주소만 보내주고 있지만 주소, 위도, 경도, 타이틀도 같이 보내줘야 할 듯.
   * ionic plugin add cordova-plugin-googlemaps 설치 필수! development-resources 페이지의 install.txt 참조하기 바람. */
  mapBtnClick() {
    this.nav.push(RoomMapPage, {address: this.address.addr1});
  }

  /**
   *
   * @param buildType
   * enum으로 되어있는가봄?
   * 여튼 해당 타입에 맞는 string 넣어주는 함수.
   */
  buildTypeFuntion(buildType) {
    let type = this.buildTypes;
    if(type.APARTMENT.number == buildType){
      this.buildType = type.APARTMENT.name;
    }
    else if(type.VILLA.number == buildType){
      this.buildType = type.VILLA.name;
    }
    else if(type.DETACHED_HOUSE.number == buildType){
      this.buildType = type.DETACHED_HOUSE.name;
    }
    else if(type.ONE_ROOM.number == buildType){
      this.buildType = type.ONE_ROOM.name;
    }
    else if(type.TWO_ROOM.number == buildType){
      this.buildType = type.TWO_ROOM.name;
    }
    else if(type.THREE_ROOM.number == buildType){
      this.buildType = type.THREE_ROOM.name;
    }
    else if(type.OFFICETEL.number == buildType){
      this.buildType = type.OFFICETEL.name;
    }
    else if(type.OFFICE.number == buildType){
      this.buildType = type.OFFICE.name;
    }
    else if(type.SHOPPING.number == buildType){
      this.buildType = type.SHOPPING.name;
    }
    else if(type.CAFE_RESTAURANT.number == buildType){
      this.buildType = type.CAFE_RESTAURANT.name;
    }
    else if(type.ACADEMY.number == buildType) {
      this.buildType = type.ACADEMY.name;
    }
    else if(type.CAFE_RESTAURANT.number == buildType){
      this.buildType = type.HOSPITAL.name;
    }
  }


  /**
   * 선택한 시공사례 글을 작성한 시공업체 정보를 가져오는 함수.
   * @param URL 데이터를 받아올 url
   * @returns {Promise<T>|Promise<TResult>|Promise<TResult2|TResult1>}
   */
  getBizUserInfo(URL: string) {

    return this.http.get(URL, {headers: contentHeaders}) //서버로부터 필요한 값 받아오기
      .map(res => res.json())//받아온 값을 json형식으로 변경
      .toPromise()
      .then(
        response => {
          this.data = response; // 해당값이 제대로 넘어오는지 확인후 프론트단에 내용추가

          this.companyName = this.data.bizUserInfo.companyName;
          this.ownerName = this.data.bizUserInfo.ownerName;
          this.mainWorkField = this.data.bizUserInfo.mainWorkField;
          this.mainWorkArea = this.data.bizUserInfo.mainWorkArea;
          this.workPlace = JSON.parse(this.data.bizUserInfo.workPlace);
          this.workPlace = this.workPlace[1] + '' + this.workPlace[2];
          this.contact = this.data.bizUserInfo.contact;
          this.companyIntroImage = this.data.bizUserInfo.companyIntroImage;     // conmpanyIntroImage

          // dom에 뿌려지는 데이터는 아래와 같이 처리를 해주자
          // sanitizing HTML stripped some content (see http://g.co/ng/security#xss) 수정을 위해서 property에 직접 할당을 해야함.
          // (pipe로는 동작하 않는다.)
          this.companyIntroImageUrl = [this.serverHost, this.companyIntroImage].join('/');
        }
      )
  }

  /*commentButtonClick() {
      this.nav.push(RoomCommentPage);
  }*/

  /**
   *
   * @param receiver 1:1 대화에서의 상대방 이메일
   * 상대방 이메일과 현재 로그인 된 유저의 이메일, 해쉬된 이메일을 QuestionDetailPage로 보내준다.
   *
   * 만약 로그인이 되어있지 않다면,
   * alertCtrl을 통해서
   * 로그인을 할 것인지를 물어본다.
   *
   * 이후 로그인페이지로 이동.
   */
  chatSelect(receiver) {
    if(this.isLogined) {
      /*
      * 1:1 대화에서 필요한 정보를 만들어 보내줘야 한다.
      * firebase3에서는 . / 이러한 기호로 검색이 불가능하므로
      * 나의 이메일과 상대방 이메일을 해쉬한 값을 같이 보내줘서
      * 해당 해쉬값으로 검색을 하도록 한다.
      * */
      let user = {
        userData: this.user.email,
        md5UserData: Md5.hashStr(this.user.email),
        toUserData: receiver,
        toMd5UserData: Md5.hashStr(receiver)
      };

      this.nav.push(QuestionDetailPage, {
        user:user
      });
    } else {
      let alert = this.alertCtrl.create({
        title: '1:1 대화',
        message: '로그인이 필요한 항목입니다. 로그인 페이지로 이동하시겠습니까?',
        buttons: [
          {
            text: '취소',
            role: '취소',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: '로그인',
            handler: () => {
              Config.SELECTED_TABS_MENU = 'LoginPage';
              this.nav.parent.select(4);
              console.log("login page로 이동하기");
            }
          }
        ]
      });
      alert.present();
    }
  }
  SlideChanged() {

    console.log(this.slides);
    let currentIndex = this.slides.getActiveIndex();
    console.log("Current index is", currentIndex);
  }
  informationSlidesChange() {

  }
  goToSlide(number) {
    console.log(this.informationSlides_index);
    this.slides.slideTo(number, 500);
  }
}
