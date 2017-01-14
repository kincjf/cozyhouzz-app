import {Component} from '@angular/core';
import {NavController, Platform, MenuController, NavParams, LoadingController} from 'ionic-angular';
import {PostService} from '../../../services/post-service';
import {RoomService} from '../../../services/room-service';
import {BuildCaseInputPage} from '../build-case-input/build-case-input';

import {BuildCaseDetailPage} from '../build-case-detail/build-case-detail';
import {config} from '../../../app/common/config';
import {STATIC_VALUE} from "../../../app/common/config/staticValue";
import * as _ from "lodash";
import {Events} from 'ionic-angular';
import {SpinnerDialog} from 'ionic-native';

import {Storage} from '@ionic/storage';
import {Room} from '../../../providers/room';
import {RoomSettingPage} from '../../mypage/room/room-info/setting';
import {isCordovaAvailable} from '../../../services/is-cordova-available';
//import {UserPage} from '../user/user';
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-build-case-list',
  templateUrl: 'build-case-list.html'
})
export class BuildCaseListPage {
  public posts: any;
  public test: any;
  public roomService: RoomService;
  public room: Room;
  public pageSize: number = 10;
  public region: string;
  public filter: Array<string>;
  public lately: string = "최신순";
  public pageStartIndex = 0;
  roomSettingInformation;
  selectOptions_region = {
    title: '검색 지역 선택'
  };
  selectOptions_lately = {
    title: '정렬 방법 선택',
    subTitle: '다수 선택 가능'
  };
  returnedDatas = [];

  constructor(public nav: NavController, public postService: PostService,
              public platform: Platform, public menu: MenuController, public params: NavParams,
              public loading: LoadingController, private storage: Storage, private RoomService: RoomService,
              private events: Events) {

    this.roomService = RoomService;
    this.region = params.get("region");

    if(!this.region) {
       this.region = '전체';
    }
    let loader = this.loading.create({
      content: '정보를 불러오고 있습니다.'
    });

    loader.present().then(() => {
      // 방 검색 조건을 가져 옴.
      this.room = this.roomService.room;
      this.filter = this.room.filter;

      // 방 불러오는 부분
      this.posts = postService.getAll();
      let URL = [config.serverHost, config.path.buildCase + '?pageSize=' + this.pageSize + '&pageStartIndex=' + this.pageStartIndex].join('/');
      this.test = postService.getBuildList(URL);
      this.test.subscribe(response => {
          this.returnedDatas = []; //데이터를 초기화
          for (let buildCaseData of response.buildCaseInfo) {
            //returnDatas에 bizUser의 정보를 data의 수만큼 받아온다.
            let buildPlaceArr = JSON.parse(buildCaseData.buildPlace);
            let key = _.findKey(STATIC_VALUE.PLACE_TYPE, ["number", buildCaseData.buildType]);

            this.returnedDatas.push({
              selectedBuildCaseIdx: buildCaseData.idx,
              title: buildCaseData.title,
              mainPreviewImage: buildCaseData.mainPreviewImage,
              HTMLText: buildCaseData.HTMLText,
              buildTotalArea: buildCaseData.buildTotalArea,
              buildType: STATIC_VALUE.PLACE_TYPE[key].name,
              buildTotalPrice: buildCaseData.buildTotalPrice,
              buildPlace: buildPlaceArr[1],
              buildPlaceDetail: buildPlaceArr[2]
            });

          }
          for (let buildCaseData of response.buildCaseInfo) {
            //returnDatas에 bizUser의 정보를 data의 수만큼 받아온다.
            let buildPlaceArr = JSON.parse(buildCaseData.buildPlace);
            let key = _.findKey(STATIC_VALUE.PLACE_TYPE, ["number", buildCaseData.buildType]);

            this.returnedDatas.push({
              selectedBuildCaseIdx: buildCaseData.idx,
              title: buildCaseData.title,
              mainPreviewImage: buildCaseData.mainPreviewImage,
              HTMLText: buildCaseData.HTMLText,
              buildTotalArea: buildCaseData.buildTotalArea,
              buildType: STATIC_VALUE.PLACE_TYPE[key].name,
              buildTotalPrice: buildCaseData.buildTotalPrice,
              buildPlace: buildPlaceArr[1],
              buildPlaceDetail: buildPlaceArr[2]
            });

          }
          console.log(this.returnedDatas);
        loader.dismiss();
        }
      );
    });
    //loader.present().then(() => {});

    this.events.subscribe('room:change', () => {
      this.room = this.roomService.room;
      this.filter = this.room.filter;
    });

  }

  doInfinite(infiniteScroll: any) {
    let URL = [config.serverHost, config.path.buildCase + '?pageSize=' + this.pageSize + '&pageStartIndex=' + this.pageStartIndex].join('/');
    this.test = this.postService.getBuildList(URL);
    this.test.subscribe(response => {
        for (let buildCaseData of response.buildCaseInfo) {
          //returnDatas에 bizUser의 정보를 data의 수만큼 받아온다.
          let buildPlaceArr = JSON.parse(buildCaseData.buildPlace);
          let key = _.findKey(STATIC_VALUE.PLACE_TYPE, ["number", buildCaseData.buildType]);

          this.returnedDatas.push({
            selectedBuildCaseIdx: buildCaseData.idx,
            title: buildCaseData.title,
            mainPreviewImage: buildCaseData.mainPreviewImage,
            HTMLText: buildCaseData.HTMLText,
            buildTotalArea: buildCaseData.buildTotalArea,
            buildType: STATIC_VALUE.PLACE_TYPE[key].name,
            buildTotalPrice: buildCaseData.buildTotalPrice,
            buildPlace: buildPlaceArr[1],
            buildPlaceDetail: buildPlaceArr[2]
          });

        }

        //infiniteScroll.enable(false);
        infiniteScroll.complete();
      }
    );
  }

  changeRegion() {
    console.log(this.region);
  }

  changeLately() {
    console.log(this.lately);
  }

  changeDetailFilter() {
    this.room.filter = this.filter;
    this.storage.set('roomSettingInformation', this.room);
  }

  ionViewWillLoad() {


  }

  ionViewLoaded() {
    setTimeout(function () {
      console.log("sfsdf");
    }, 150);
  }

  settingButtonClick() {
    this.nav.push(RoomSettingPage);
  }
  inputButtonClick() {
    this.nav.push(BuildCaseInputPage);
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

  showSpinner() {

  }

  // on click, go to post detail
  viewPost(postId) {
    this.nav.push(BuildCaseDetailPage, {id: postId})
  }

  /*
   // on click, go to user timeline
   viewUser(userId) {
   this.nav.push(UserPage, {id: userId})
   }
   */
}
