"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var md5_1 = require("ts-md5/dist/md5");
var question_detail_1 = require('../../mypage/question/question-detail/question-detail');
require('rxjs/add/operator/toPromise');
var config_1 = require('../../../app/common/config');
var staticValue_1 = require("../../../app/common/config/staticValue");
var ionic_native_1 = require('ionic-native');
var room_map_1 = require('../room-map/room-map');
var is_cordova_available_1 = require('../../../services/is-cordova-available');
var headers_1 = require('../../../app/common/headers');
var config_2 = require("../../../app/config");
// import {RoomCommentPage} from '../room-comment/room-comment';
var RoomDetailPage = (function () {
    function RoomDetailPage(nav, postService, http, params, alertCtrl, sanitizer, loader, userService, events) {
        var _this = this;
        this.nav = nav;
        this.postService = postService;
        this.http = http;
        this.params = params;
        this.alertCtrl = alertCtrl;
        this.sanitizer = sanitizer;
        this.loader = loader;
        this.userService = userService;
        this.events = events;
        this.serverHost = config_1.config.serverHost;
        this.buildTypes = staticValue_1.STATIC_VALUE.PLACE_TYPE;
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
        var URL = [config_1.config.serverHost, config_1.config.path.roomDetailInfo, this.selectedroomInfoIdx].join('/');
        console.log(URL);
        this.vrImageURL = sanitizer.bypassSecurityTrustResourceUrl('http://npus.kr:3000/roomInfoVR/6');
        this.roomInfoResult = postService.getroomInfoInfo(URL);
        this.roomInfoResult.toPromise()
            .then(function (response) {
            var postInfoData = response.detailList[0];
            _this.ID = postInfoData.ID;
            _this.address = JSON.parse(postInfoData.address);
            _this.area_size = postInfoData.area_size;
            _this.content = postInfoData.content;
            _this.coordinate = JSON.parse(postInfoData.coordinate);
            _this.createdAt = postInfoData.createAt;
            _this.deposit = postInfoData.deposit;
            _this.display_name = postInfoData.display_name;
            _this.email = postInfoData.email;
            _this.like = postInfoData.like;
            _this.locale = postInfoData.local;
            _this.telephone = postInfoData.telephone;
            _this.meta_value = JSON.parse(postInfoData.meta_value);
            _this.monthly_rent_fee = postInfoData.monthly_rent_fee;
            _this.old_address = JSON.parse(postInfoData.old_address);
            _this.old_address_dong = postInfoData.old_address_dong;
            _this.post_code = postInfoData.post_code;
            _this.post_id = postInfoData.post_id;
            _this.post_init_date = postInfoData.post_init_date;
            _this.post_init_date_gmt = postInfoData.post_init_date_gmt;
            _this.post_modified_date = postInfoData.post_modified_date;
            _this.post_modified_date_gmt = postInfoData.post_modified_date_gmt;
            _this.post_status = postInfoData.post_status;
            _this.post_type = postInfoData.post_type;
            _this.read_count = postInfoData.read_count;
            _this.room_type = '원룸'; //this.buildTypeFuntion(postInfoData.room_type);
            _this.thumbnail_image_path = postInfoData.thumbnail_image_path;
            _this.thumbnail_media_id = postInfoData.thumbnail_media_id;
            _this.title = postInfoData.title;
            _this.unlike = postInfoData.unlike;
            _this.updatedAt = postInfoData.updateAt;
            _this.user_id = postInfoData.user_id;
            loader.hide();
        });
        this.isLogined = userService.getIsLogind();
        if (this.isLogined) {
            this.jwt = userService.getJwtToken();
            this.user = userService.getUserInfo();
        }
        headers_1.contentHeaders.set('Authorization', this.jwt); //Header에 jwt값 추가하기
        events.subscribe('roomInfoDetail:logined', function () {
            _this.isLogined = userService.getIsLogind();
            if (_this.isLogined) {
                _this.user = _this.userService.getUserInfo();
            }
        });
        /*
         * 로그아웃 또한 로그인과 마찬가지
         * */
        events.subscribe('roomInfoDetail:logout', function () {
            _this.isLogined = false;
            _this.user = null;
            _this.userService.removeUserInfo();
        });
    }
    ;
    RoomDetailPage.prototype.ionViewWillEnter = function () {
        //this.collectionsCommentsCtrl();
        //this.collectionsCommentsCtrl();
    };
    RoomDetailPage.prototype.ionViewDidLoad = function () {
        //this.collectionsCommentsCtrl();
    };
    /**
     * 전화하기 버튼을 클릭했을 때 호출되는 함수.
     * native 기능이기 때문에 핸드폰에서 실행되고 있는가를 isCordovaAvailable함수를 통해서 확인한다.
     * native일 경우, alertCtrl을 이용해서 요금 부과를 확인하고 전화걸기를 수행한다.
     * ionic plugin add call-number 필수! */
    RoomDetailPage.prototype.callNumber = function (telephone) {
        if (!is_cordova_available_1.isCordovaAvailable()) {
            return false;
        }
        var alert = this.alertCtrl.create({
            title: '010-3326-7822',
            message: '정말 전화를 거시겠습니까? 요금제에 따라 요금이 부과될 수 있습니다.',
            buttons: [
                {
                    text: '취소',
                    role: '취소',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '전화걸기',
                    handler: function () {
                        ionic_native_1.CallNumber.callNumber('010-3326-7822', true).then(function () { return console.log('Launched dialer!'); });
                    }
                }
            ]
        });
        alert.present();
    };
    /*
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
      }*/
    /**
     * 지도보기 버튼을 클릭했을 때 호출되는 함수
     * 현재는 주소만 보내주고 있지만 주소, 위도, 경도, 타이틀도 같이 보내줘야 할 듯.
     * ionic plugin add cordova-plugin-googlemaps 설치 필수! development-resources 페이지의 install.txt 참조하기 바람. */
    RoomDetailPage.prototype.mapBtnClick = function () {
        this.nav.push(room_map_1.RoomMapPage, { address: this.address.addr1 });
    };
    /**
     *
     * @param buildType
     * enum으로 되어있는가봄?
     * 여튼 해당 타입에 맞는 string 넣어주는 함수.
     */
    RoomDetailPage.prototype.buildTypeFuntion = function (buildType) {
        var type = this.buildTypes;
        if (type.APARTMENT.number == buildType) {
            this.buildType = type.APARTMENT.name;
        }
        else if (type.VILLA.number == buildType) {
            this.buildType = type.VILLA.name;
        }
        else if (type.DETACHED_HOUSE.number == buildType) {
            this.buildType = type.DETACHED_HOUSE.name;
        }
        else if (type.ONE_ROOM.number == buildType) {
            this.buildType = type.ONE_ROOM.name;
        }
        else if (type.TWO_ROOM.number == buildType) {
            this.buildType = type.TWO_ROOM.name;
        }
        else if (type.THREE_ROOM.number == buildType) {
            this.buildType = type.THREE_ROOM.name;
        }
        else if (type.OFFICETEL.number == buildType) {
            this.buildType = type.OFFICETEL.name;
        }
        else if (type.OFFICE.number == buildType) {
            this.buildType = type.OFFICE.name;
        }
        else if (type.SHOPPING.number == buildType) {
            this.buildType = type.SHOPPING.name;
        }
        else if (type.CAFE_RESTAURANT.number == buildType) {
            this.buildType = type.CAFE_RESTAURANT.name;
        }
        else if (type.ACADEMY.number == buildType) {
            this.buildType = type.ACADEMY.name;
        }
        else if (type.CAFE_RESTAURANT.number == buildType) {
            this.buildType = type.HOSPITAL.name;
        }
    };
    /**
     * 선택한 시공사례 글을 작성한 시공업체 정보를 가져오는 함수.
     * @param URL 데이터를 받아올 url
     * @returns {Promise<T>|Promise<TResult>|Promise<TResult2|TResult1>}
     */
    RoomDetailPage.prototype.getBizUserInfo = function (URL) {
        var _this = this;
        return this.http.get(URL, { headers: headers_1.contentHeaders }) //서버로부터 필요한 값 받아오기
            .map(function (res) { return res.json(); }) //받아온 값을 json형식으로 변경
            .toPromise()
            .then(function (response) {
            _this.data = response; // 해당값이 제대로 넘어오는지 확인후 프론트단에 내용추가
            _this.companyName = _this.data.bizUserInfo.companyName;
            _this.ownerName = _this.data.bizUserInfo.ownerName;
            _this.mainWorkField = _this.data.bizUserInfo.mainWorkField;
            _this.mainWorkArea = _this.data.bizUserInfo.mainWorkArea;
            _this.workPlace = JSON.parse(_this.data.bizUserInfo.workPlace);
            _this.workPlace = _this.workPlace[1] + '' + _this.workPlace[2];
            _this.contact = _this.data.bizUserInfo.contact;
            _this.companyIntroImage = _this.data.bizUserInfo.companyIntroImage; // conmpanyIntroImage
            // dom에 뿌려지는 데이터는 아래와 같이 처리를 해주자
            // sanitizing HTML stripped some content (see http://g.co/ng/security#xss) 수정을 위해서 property에 직접 할당을 해야함.
            // (pipe로는 동작하 않는다.)
            _this.companyIntroImageUrl = [_this.serverHost, _this.companyIntroImage].join('/');
        });
    };
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
    RoomDetailPage.prototype.chatSelect = function (receiver) {
        var _this = this;
        if (this.isLogined) {
            /*
            * 1:1 대화에서 필요한 정보를 만들어 보내줘야 한다.
            * firebase3에서는 . / 이러한 기호로 검색이 불가능하므로
            * 나의 이메일과 상대방 이메일을 해쉬한 값을 같이 보내줘서
            * 해당 해쉬값으로 검색을 하도록 한다.
            * */
            var user = {
                userData: this.user.email,
                md5UserData: md5_1.Md5.hashStr(this.user.email),
                toUserData: receiver,
                toMd5UserData: md5_1.Md5.hashStr(receiver)
            };
            this.nav.push(question_detail_1.QuestionDetailPage, {
                user: user
            });
        }
        else {
            var alert_1 = this.alertCtrl.create({
                title: '1:1 대화',
                message: '로그인이 필요한 항목입니다. 로그인 페이지로 이동하시겠습니까?',
                buttons: [
                    {
                        text: '취소',
                        role: '취소',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: '로그인',
                        handler: function () {
                            config_2.Config.SELECTED_TABS_MENU = 'LoginPage';
                            _this.nav.parent.select(3);
                            console.log("login page로 이동하기");
                        }
                    }
                ]
            });
            alert_1.present();
        }
    };
    RoomDetailPage = __decorate([
        core_1.Component({
            selector: 'page-build-case-detail',
            templateUrl: 'room-detail.html'
        })
    ], RoomDetailPage);
    return RoomDetailPage;
}());
exports.RoomDetailPage = RoomDetailPage;
