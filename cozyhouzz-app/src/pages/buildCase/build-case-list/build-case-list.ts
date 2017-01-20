import {Component} from '@angular/core';
import {NavController, Platform, MenuController, NavParams, LoadingController} from 'ionic-angular';
import {PostService} from '../../../services/post-service';
import {RoomService} from '../../../services/room-service';
import {UserService} from '../../../services/user-service';
import {BuildCaseInputPage} from '../build-case-input/build-case-input';

import {BuildCaseDetailPage} from '../build-case-detail/build-case-detail';
import {config} from '../../../app/common/config';
import {STATIC_VALUE} from "../../../app/common/config/staticValue";
import * as _ from "lodash";
import {Events} from 'ionic-angular';

import {Room} from '../../../providers/room';
import {RoomSettingPage} from '../../mypage/room/room-info/setting';

import {SortPipe} from '../../../pipes/SortByJsonObjects';

@Component({
  selector: 'page-build-case-list',
  templateUrl: 'build-case-list.html'
})
export class BuildCaseListPage {
  public posts: any;
  public buildCaseResult: any;
  public room: Room;
  public pageSize: number = 10;
  public region: string;
  public filter: Array<string>;
  public lately: number = 0;
  public pageStartIndex = 0;
  public user: any;
  public isLogined: boolean = false;
  public orderBy: string = ''; //orderBy변수가 빈문자열 또는 null일 경우, 정렬하지 않음.  //selectedBuildCaseIdx
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
              public loading: LoadingController, private roomService: RoomService,
              private events: Events, private userService: UserService) {

    /*
     *  returnedDatas 배열 초기화. 방 정보 리스트를 가지고 있음
     *  생성자와 refresh 부분에서 초기화 시켜주어야 함.
     *  */
    this.returnedDatas = [];
    this.region = params.get("region"); //메인페이지에서 어떤 지역을 선택했는지 가져옴.
    if (!this.region) this.region = '전체'; //지역을 선택하지 않았으면? 메뉴를 타고 들어온 것임. 전체로 바꿔줌.

    /*
     * 로그인 되어있는지 체크.
     * 먼저 isLogined에 넣고 로그인 되어있다면 유저의 정보를 가져옴
     * */
    this.isLogined = userService.getIsLogind();
    if (this.isLogined) {
      this.user = this.userService.getUserInfo();
    }
    /*
     * 로딩 화면 띄우기 위해서 로더 선언.
     * */
    let loader = this.loading.create({
      content: '정보를 불러오고 있습니다.'
    });

    loader.present().then(() => {
      /*
       * 방 검색 조건을 가져 옴.*/
      this.room = this.roomService.room;
      this.filter = this.room.filter;
      /*
       * 방 정보 불러오는 부분 */
      let URL = ['http://api.cozyhouzz.co.kr/api/build-case?pageSize=' + this.pageSize + '&pageStartIndex=' + this.pageStartIndex].join('/');

      // let URL = [config.serverHost, config.path.buildCase + '?pageSize=' + this.pageSize + '&pageStartIndex=' + this.pageStartIndex].join('/');
      this.getDatas(URL, loader, null, null);

    });
    /*
     * 아래는 이벤트 리스너를 설정하는 것. 로그인 또는 로그아웃이 되면 각 페이지마다 달라져야 할 게 있기 때문에
     * 그때 수행할 것들을 정하는 부분임. 여기서는 방 등록 버튼의 유무가 로그인에 따라 달라지므로
     * isLogined 정보와 user 정보를 초기화 해줘야 한다. */
    events.subscribe('buildCaseList:logined', () => {
      this.isLogined = userService.getIsLogind();
      if (this.isLogined) {
        this.user = this.userService.getUserInfo();
      }
    });
    /*
     * 로그아웃 또한 로그인과 마찬가지
     * */
    events.subscribe('buildCaseList:logout', () => {
      this.isLogined = false;
      this.user = null;
      this.userService.removeUserInfo();
    });
    /*
     * 사용자가 방 검색 조건을 바꿀 때 발생하는 이벤트의 리스너이다.
     * 바뀐 정보를 roomService를 통해서 다시 가져온다.
     * services/room-service.ts 부분
     *
     * 아래 이벤트를 발생시키는 곳은
     * page/room/room-info/setting.ts 이다. 가서 확인할 것.
     * */
    this.events.subscribe('room:change', () => {
      this.room = this.roomService.room;
      this.filter = this.room.filter;
    });

  }

  /**
   *
   * @param url 시공 사례데이터를 가져올 url을 넘겨주면 됨.
   * @param loader -> loader 객체, 없으면 null
   * @param infiniteScroll -> infiniteScroll 객체, 없으면 null
   * @param refresher ->refresher 객체, 없으면 null
   *
   * loader이 null인지 체크하고 null이 아니면 dismiss 해줘야 함.
   * infiniteScroll이 null인지 체크하고 null이 아니면 complete 해줘야 함.
   * refresher이 null인지 체크하고 null이 아니면 complete 해줘야 함.
   */
  getDatas(url, loader, infiniteScroll, refresher) {
    this.buildCaseResult = this.postService.getBuildList(url);
    this.buildCaseResult.subscribe(response => {
        /*
         * 가져온 방 정보를 반복문을 수행하면서 위 returnedDatas 배열에 집어 넣는다.
         * */
        for (let buildCaseData of response.buildCaseInfo) {
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
        if (loader != null) loader.dismiss(); //로딩화면 종료
        if (infiniteScroll != null) infiniteScroll.complete(); //infiniteScroll 완료
        if (refresher != null) refresher.complete(); //refresher 완료
      }
    );
  }

  /**
   *
   * @param refresher
   * refresh 함수
   * 지금 적용은 시켜놓지 않았지만 새로운 데이터를 가져올 때 사용.
   * 생성자 부분에서 데이터를 가져오는 것을 여기서 다시 해주면 된다.
   * 나중에 함수로 묶어야 할 듯.
   */
  doRefresh(refresher) {
    /*
     * 방 정보 불러오는 부분 */
    let URL = ['http://api.cozyhouzz.co.kr/api/build-case?pageSize=' + this.pageSize + '&pageStartIndex=' + this.pageStartIndex].join('/');
    // let URL = [config.serverHost, config.path.buildCase + '?pageSize=' + this.pageSize + '&pageStartIndex=' + this.pageStartIndex].join('/');

    setTimeout(() => {
      this.returnedDatas = [];
      this.getDatas(URL, null, null, refresher);
    }, 1000);
  }

  /**
   /**
   *
   * @param infiniteScroll
   * 무한 스크롤 처리하는 부분.
   * 추가로 데이터를 가져와 배열에 넣어주면 된다.
   * 위와 다른점은 returnedDatas를 초기화 하지 않는다는 것.
   * */
  doInfinite(infiniteScroll: any) {
    let URL = ['http://api.cozyhouzz.co.kr/api/build-case?pageSize=10&pageStartIndex=0'].join('/');
    this.getDatas(URL, null, infiniteScroll, null);
  }

  /**
   * select 지역 바뀌었을 경우 호출되는 함수.
   * */
  changeRegion() {
    console.log(this.region);
  }

  /**
   * select 정렬 순서가 바뀌었을 경우 호출되는 함수.
   * this.orderBy 변수에 정렬하고자 하는 대상을 텍스트로 입력해주면 됨.
   * */
  changeLately() {
    /*
     <ion-option value="0" selected="true">정렬방법</ion-option>
     <ion-option value="1">최신순</ion-option>
     <ion-option value="2">이름순</ion-option>
     <ion-option value="3">보증금순</ion-option>
     <ion-option value="4">월세순</ion-option>
     * */
    let lately = this.lately;
    if (lately == 0) this.orderBy = '';
    else if (lately == 1) this.orderBy = 'selectedBuildCaseIdx';
    else if (lately == 2) this.orderBy = 'title';
    else if (lately == 3) this.orderBy = 'buildTotalPrice';
  }

  /**
   * 방 검색 조건 설정 버튼을 클릭했을 때
   * 호출되는 함수.
   */
  settingButtonClick() {
    this.nav.parent.select(4);

    //this.nav.push(RoomSettingPage);
  }

  /**
   * 방 입력 버튼 클릭했을 경우 호출되는 함수.
   */
  inputButtonClick() {
    this.nav.push(BuildCaseInputPage);
  }

  /**
   *
   * @param selectedBuildCaseIdx 선택된 시공사례(방)의 index 번호
   * 시공사례(방) 상세보기 페이지로 이동
   * 이때 선택된 방의 index번호를 함께 넘겨준다.
   */
  viewPost(selectedBuildCaseIdx) {
    this.nav.push(BuildCaseDetailPage, {selectedBuildCaseIdx: selectedBuildCaseIdx})
  }

  /**
   * 특정 페이지에서 메뉴를 사용하려면 아래처럼 해주어야 함.
   * 페이지 들어갈 때 (Enter) 메뉴 enable->true
   */
  ionViewDidEnter() {
    this.menu.enable(true);
  };

  /**
   * 특정 페이지에서 메뉴를 사용하려면 아래처럼 해주어야 함.
   * 페이지 나갈 때 (Leave) 메뉴 enable->false
   */
  ionViewWillLeave() {
    this.menu.enable(false);
  }

}
