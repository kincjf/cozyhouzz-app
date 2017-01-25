import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NoticeBoardInputPage} from '../notice-board-input/notice-board-input';
import {PostService} from '../../../services/post-service';
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
/*
* <ion-list *ngFor="#item of items">
 <ion-item-sliding *ngIf="item.deleted === false" #slidingItem>
 <ion-item>{{item.fach}} ({{item.kuerzel}})</ion-item>
 <ion-item-options>
 <button (click)="showEditModal(item, slidingItem)"><ion-icon name="create"></ion-icon>Bearbeiten</button>
 <button danger (click)="doConfirm(item, slidingItem)"><ion-icon name="trash"></ion-icon>Löschen</button>
 </ion-item-options>
 </ion-item-sliding>
 </ion-list>
*
* */

  boards: Array<{title: string, contents: string, writer: string, create_date: string, selected: boolean}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public postService:PostService) {
      this.boards = [
        {
          title: '[공지] 신규 가입자 무료 PLUS 3일 안내',
          contents: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
          writer: '관리자',
          create_date: '2015-04-01',
          selected: false
        },
        {
          title: '[공지] 아늑한 집 출시!',
          contents: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
          writer: '관리자',
          create_date: '2015-12-01',
          selected: false
        },
        {
          title: '[공지] 상대방앱이 반응이 없을 경우',
          contents: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
          writer: '관리자',
          create_date: '2016-04-01',
          selected: false
        },
        {
          title: '[공지] 신규 가입자 무료 PLUS 3일 안내',
          contents: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
          writer: '관리자',
          create_date: '2015-04-01',
          selected: false
        },
        {
          title: '[공지] 아늑한 집 출시!',
          contents: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
          writer: '관리자',
          create_date: '2015-12-01',
          selected: false
        },
        {
          title: '[공지] 상대방앱이 반응이 없을 경우',
          contents: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
          writer: '관리자',
          create_date: '2016-04-01',
          selected: false
        }
      ]
  }
  showEditModal(item, selected) {
     item.selected = !selected;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticeBoardListPage');
  }
  inputBoardButtonClick() {
    this.navCtrl.push(NoticeBoardInputPage);
  }

}
