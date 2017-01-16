import {Component} from '@angular/core';
import {NavController, LoadingController, AlertController} from 'ionic-angular';

import 'rxjs/add/operator/toPromise';
import {Http} from '@angular/http';
import {config} from '../../../app/common/config';
import {STATIC_VALUE} from "../../../app/common/config/staticValue";
import * as _ from "lodash";
import * as moment from 'moment';
import {PostService} from '../../../services/post-service';
import {IMarker, IPoint} from './interfaces';
import { CallNumber } from 'ionic-native';
import {BuildCaseMapPage} from '../build-case-map/build-case-map';
import {isCordovaAvailable} from '../../../services/is-cordova-available';
/*
 Generated class for the BuildCaseDetail page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

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
  buildTotalArea: number;
  mainPreviewImage: string;
  buildTotalPrice: number;
  htmlText: any;
  VRImages: any;
  coordinate: any;
  regionCategory: any;
  initWriteDate: string;

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
  public test: any;

  constructor(public nav: NavController, public postService: PostService, public http: Http,
              public loading: LoadingController, private alertCtrl: AlertController) {
    // get sample data only
    //this.post = postService.getItem(navParams.get('id'));
    this.post = postService.getItem(0);
    let loader = this.loading.create({
      content: '정보를 불러오고 있습니다.'
    });
    loader.present().then(() => {
      this.test = postService.getBuildCaseInfo("http://api.cozyhouzz.co.kr/api/build-case/6");
      this.test.toPromise()
        .then(
          response => {
            this.memberIdx = response.buildCaseInfo.memberIdx;
            this.title = response.buildCaseInfo.title;
            this.buildType = response.buildCaseInfo.buildType;
            // this.buildTypeFuntion(this.buildType);
            this.buildPlace = JSON.parse(response.buildCaseInfo.buildPlace);
            this.buildPlace = this.buildPlace[1] + '' + this.buildPlace[2];
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


  };


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

  mapBtnClick() {
     this.nav.push(BuildCaseMapPage);
  }
  toggleLike(post) {
    // if user liked
    if (post.liked) {
      post.likeCount--;
    } else {
      post.likeCount++;
    }

    post.liked = !post.liked
  }

  // on click, go to user timeline
  viewUser(userId) {
    //this.nav.push(UserPage, {id: userId})
  }
}
