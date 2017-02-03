"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var notice_board_input_1 = require('../notice-board-input/notice-board-input');
var index_1 = require("../../../app/common/config/index");
/*
  Generated class for the NoticeBoardList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var NoticeBoardListPage = (function () {
    function NoticeBoardListPage(navCtrl, navParams, postService, loader) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.postService = postService;
        this.loader = loader;
        this.boards = [];
        this.notices = null;
        this.pageStartIndex = 0;
        this.pageSize = 10;
        this.loader.show("정보를 불러오고 있습니다.");
        this.pageSize = 10;
        this.pageStartIndex = 0;
        this.notices = [];
        var URL = [index_1.config.serverHost, index_1.config.path.notice, '?pageSize=' + this.pageSize + '&pageStartIndex=' + this.pageStartIndex].join('/'); //"http://api.cozyhouzz.co.kr/api/auth/login"
        this.getDatas(URL, this.loader, null, null);
    }
    /**
     * 무한 스크롤, 사용자가 공지사항을 더 불러올 수 있도록 하는 함수.
     * 아래의 getDatas를 호출한다.
     * 이때 무한스크롤의 객체를 매개변수로 넘겨줘서
     * 함수 내부에서 complete를 할 수 있도록 해야 한다.
     * @param infiniteScroll
     */
    NoticeBoardListPage.prototype.doInfinite = function (infiniteScroll) {
        this.pageStartIndex += this.pageSize;
        var URL = [index_1.config.serverHost, index_1.config.path.notice, '?pageSize=' + this.pageSize + '&pageStartIndex=' + this.pageStartIndex].join('/');
        this.getDatas(URL, null, infiniteScroll, null);
    };
    /**
     * 공지사항을 서버로부터 가져오는 함수
     * @param url 요청할 api url
     * @param loader
     * @param infiniteScroll
     * @param refresher
     *
     * 각각의 객체가 null인지를 판별하고 적절한 조취를 취한다.
     * 만약 더이상 데이터가 없다면 무한스크롤을 사용하지 못하도록 enable을 false로 설정한다.
     */
    NoticeBoardListPage.prototype.getDatas = function (url, loader, infiniteScroll, refresher) {
        var _this = this;
        this.postService.getNoticeBoardList(url).subscribe(function (response) {
            /*
            * 서버로부터 응답을 받은 경우.
            * notices의 길이를 구해서 noticeListSize에 넣는다. */
            _this.notices = response.noticeList;
            var noticeListSize = _this.notices.length;
            for (var i = 0; i < noticeListSize; i++) {
                _this.boards.push({
                    title: _this.notices[i].title,
                    contents: _this.notices[i].content,
                    writer: _this.notices[i].email,
                    create_date: _this.notices[i].post_init_date,
                    selected: false
                });
            }
            if (loader != null)
                loader.hide();
            if (infiniteScroll != null)
                infiniteScroll.complete(); //infiniteScroll 완료
            if (refresher != null)
                refresher.complete();
        }, function (error) {
            if (loader != null)
                loader.hide(); //로딩화면 종료
            if (infiniteScroll != null) {
                infiniteScroll.complete(); //infiniteScroll 완료
                infiniteScroll.enable(false);
            }
            if (refresher != null)
                refresher.complete(); //refresher 완료
        });
    };
    /**
     * 공지사항의 세부 글을 볼 수 있도록 설정을 변경해주는 함수.
     * @param item 어떠한 게시물인가를 나타냄.
     * @param selected true, false
     */
    NoticeBoardListPage.prototype.showEditModal = function (item, selected) {
        item.selected = !selected;
    };
    NoticeBoardListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NoticeBoardListPage');
    };
    /**
     * 게시물 쓰기 버튼을 클릭한 경우.
     */
    NoticeBoardListPage.prototype.inputBoardButtonClick = function () {
        this.navCtrl.push(notice_board_input_1.NoticeBoardInputPage);
    };
    NoticeBoardListPage = __decorate([
        core_1.Component({
            selector: 'page-notice-board-list',
            templateUrl: 'notice-board-list.html'
        })
    ], NoticeBoardListPage);
    return NoticeBoardListPage;
}());
exports.NoticeBoardListPage = NoticeBoardListPage;
