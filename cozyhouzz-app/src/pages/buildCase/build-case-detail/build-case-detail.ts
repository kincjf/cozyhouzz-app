import {Component} from '@angular/core';
import {NavController, LoadingController, AlertController, NavParams} from 'ionic-angular';
import {DomSanitizer, SafeUrl, SafeResourceUrl} from '@angular/platform-browser';


import 'rxjs/add/operator/toPromise';
import {Http} from '@angular/http';
import {config} from '../../../app/common/config';
import {STATIC_VALUE} from "../../../app/common/config/staticValue";
import * as _ from "lodash";
import * as moment from 'moment';
import {PostService} from '../../../services/post-service';
import {IMarker, IPoint} from './interfaces';
import {CallNumber} from 'ionic-native';
import {BuildCaseMapPage} from '../build-case-map/build-case-map';
import {isCordovaAvailable} from '../../../services/is-cordova-available';
import {contentHeaders} from '../../../app/common/headers';
import {UserService} from '../../../services/user-service';

@Component({
  selector: 'page-build-case-detail',
  templateUrl: 'build-case-detail.html'
})
export class BuildCaseDetailPage {
  public post: any;
  public data: any;

  title: string;
  buildType: string;
  buildPlace: any;
  buildName: any;
  buildAddress: any;
  buildTotalArea: number;
  mainPreviewImage: string;
  buildTotalPrice: number;
  htmlText: any;
  VRImages: any;
  coordinate: any;
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

  buildTypes = STATIC_VALUE.PLACE_TYPE;
  selectedBuildCaseIdx: any;
  public buildCaseResult: any;

  private jwt:string;
  private isLogined:boolean;
  private user: any;

  constructor(public nav: NavController, public postService: PostService, public http: Http, public params: NavParams,
              public loading: LoadingController, private alertCtrl: AlertController, private sanitizer: DomSanitizer,
              public userService:UserService) {
    this.isLogined = false;
    /*
     * 선택된 방 정보를 가져온다.
     * 이는 buildCaseListPage에서 navCtroller가 page를 push할 때 같이 넘겨준 값.
     * */
    this.selectedBuildCaseIdx = params.get("selectedBuildCaseIdx");
    this.post = postService.getItem(0); //해당 문장은 추후 지워야 됨.
    let loader = this.loading.create({
      content: '정보를 불러오고 있습니다.'
    });
    /*
     * 로딩화면을 띄우고 서버로부터 데이터를 가져오는 부분.
     * 현재는 그냥 url로 되어있지만 config에서 url을 설정해서 추후 바꿔야 함.
     * */
    loader.present().then(() => {
      this.vrImageURL = sanitizer.bypassSecurityTrustResourceUrl('http://npus.kr:3000/RoomInfoVR/6');
      this.buildCaseResult = postService.getBuildCaseInfo("http://api.cozyhouzz.co.kr/api/build-case/" + this.selectedBuildCaseIdx);
      this.buildCaseResult.toPromise()
        .then(
          response => {
            console.log(response);
            this.memberIdx = response.buildCaseInfo.memberIdx;
            this.title = response.buildCaseInfo.title;
            this.buildType = response.buildCaseInfo.buildType;
            // this.buildTypeFuntion(this.buildType);
            this.buildPlace = JSON.parse(response.buildCaseInfo.buildPlace);
            this.buildName = this.buildPlace[2];
            this.buildAddress = this.buildPlace[1];
            this.buildPlace = this.buildPlace[1] + ' ' + this.buildPlace[2];
            this.buildTotalArea = response.buildCaseInfo.buildTotalArea;
            this.mainPreviewImage = response.buildCaseInfo.mainPreviewImage;
            this.buildTotalPrice = response.buildCaseInfo.buildTotalPrice;
            this.htmlText = response.buildCaseInfo.HTMLText;
            this.VRImages = JSON.parse(response.buildCaseInfo.VRImages);
            this.coordinate = response.buildCaseInfo.coordinate;    // 나중에 좌표를 받아서 Daum Map에 뿌려준다
            // this.coordinate = JSON.parse(response.buildCaseInfo.coordinate);
            this.regionCategory = response.buildCaseInfo.regionCategory;
            this.initWriteDate = moment(response.buildCaseInfo.initWriteDate).format('YYYY/MM/DD HH:mm:ss');

            let key = _.findKey(STATIC_VALUE.PLACE_TYPE, ["number", this.buildType]);
            this.buildType = STATIC_VALUE.PLACE_TYPE[key].name;
            loader.dismiss();
          }
        );
    });
    this.isLogined = userService.getIsLogind();
    if(this.isLogined) {
      this.jwt = userService.getJwtToken();
      this.user = userService.getUserInfo();
    }
    contentHeaders.set('Authorization', this.jwt);//Header에 jwt값 추가하기


  };
  ionViewWillEnter() {
    //this.collectionsCommentsCtrl();
    //this.collectionsCommentsCtrl();
  }
  ionViewDidLoad() {
    //this.collectionsCommentsCtrl();

  }
  /**
   * 전화하기 버튼을 클릭했을 때 호출되는 함수.
   * native 기능이기 때문에 핸드폰에서 실행되고 있는가를 isCordovaAvailable함수를 통해서 확인한다.
   * native일 경우, alertCtrl을 이용해서 요금 부과를 확인하고 전화걸기를 수행한다.
   * ionic plugin add call-number 필수! */
  callNumber() {
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


  collectionsCommentsCtrl() {
    var disqus_config = function () {
      this.page.url = 'npus.krgfgfg';  // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = 'npus.kr333'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };

    (function() {
      var d = document, s = d.createElement('script');
      s.src = '//npus-kr.disqus.com/embed.js';
      s.setAttribute('data-timestamp', (new Date()).toString());
      (d.head || d.body).appendChild(s);
    })();
  }


  /**
   * 지도보기 버튼을 클릭했을 때 호출되는 함수
   * 현재는 주소만 보내주고 있지만 주소, 위도, 경도, 타이틀도 같이 보내줘야 할 듯.
   * ionic plugin add cordova-plugin-googlemaps 설치 필수! development-resources 페이지의 install.txt 참조하기 바람. */
  mapBtnClick() {
    this.nav.push(BuildCaseMapPage, {address: this.buildAddress});
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
}
