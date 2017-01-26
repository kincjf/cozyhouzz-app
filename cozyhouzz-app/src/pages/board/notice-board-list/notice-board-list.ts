import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NoticeBoardInputPage} from '../notice-board-input/notice-board-input';
import {PostService} from '../../../services/post-service';
import {config} from "../../../app/common/config/index";
import {Loader} from "../../../providers/loader";

/*
  Generated class for the NoticeBoardList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notice-board-list',
  templateUrl: 'notice-board-list.html'
})
export class NoticeBoardListPage {
  boards: Array<any> = [];
  notices:any = null;
  pageStartIndex = 0;
  pageSize = 10;
  constructor(public navCtrl: NavController, public navParams: NavParams, public postService:PostService, public loader:Loader) {
    this.loader.show("정보를 불러오고 있습니다.");

    this.pageSize = 10;
    this.pageStartIndex = 0;
    this.notices = [];

    let URL = [config.serverHost, config.path.notice, '?pageSize=' + this.pageSize + '&pageStartIndex=' + this.pageStartIndex].join('/'); //"http://api.cozyhouzz.co.kr/api/auth/login"
    this.getDatas(URL, this.loader, null, null);
  }

  /**
   * 무한 스크롤, 사용자가 공지사항을 더 불러올 수 있도록 하는 함수.
   * 아래의 getDatas를 호출한다.
   * 이때 무한스크롤의 객체를 매개변수로 넘겨줘서
   * 함수 내부에서 complete를 할 수 있도록 해야 한다.
   * @param infiniteScroll
   */
  doInfinite(infiniteScroll: any) {
    this.pageStartIndex += this.pageSize;
    let URL = [config.serverHost, config.path.notice, '?pageSize=' + this.pageSize + '&pageStartIndex=' + this.pageStartIndex].join('/');
    this.getDatas(URL, null, infiniteScroll, null);
  }

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
  getDatas(url, loader, infiniteScroll, refresher) {
    this.postService.getNoticeBoardList(url).subscribe(response => {
      /*
      * 서버로부터 응답을 받은 경우.
      * notices의 길이를 구해서 noticeListSize에 넣는다. */
      this.notices = response.noticeList;
      let noticeListSize = this.notices.length;

      for(let i=0; i<noticeListSize; i++) {
        this.boards.push(
          {
            title: this.notices[i].title,
            contents: this.notices[i].content,
            writer: this.notices[i].email,
            create_date: this.notices[i].post_init_date,
            selected: false
          });
      }

        if (loader != null) loader.hide();
        if (infiniteScroll != null) infiniteScroll.complete(); //infiniteScroll 완료
        if (refresher != null) refresher.complete();
      }, error => {
        if (loader != null) loader.hide(); //로딩화면 종료
        if (infiniteScroll != null) {
          infiniteScroll.complete(); //infiniteScroll 완료
          infiniteScroll.enable(false);
        }
        if (refresher != null) refresher.complete(); //refresher 완료
      }
    );
  }

  /**
   * 공지사항의 세부 글을 볼 수 있도록 설정을 변경해주는 함수.
   * @param item 어떠한 게시물인가를 나타냄.
   * @param selected true, false
   */
  showEditModal(item, selected) {
     item.selected = !selected;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticeBoardListPage');
  }

  /**
   * 게시물 쓰기 버튼을 클릭한 경우.
   */
  inputBoardButtonClick() {
    this.navCtrl.push(NoticeBoardInputPage);
  }

}
