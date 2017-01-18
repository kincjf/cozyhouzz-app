import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { PostService } from '../../services/post-service';
import { BuildCaseListPage } from '../buildCase/build-case-list/build-case-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public posts: any;
  public test: any;
  constructor(public nav: NavController, public postService: PostService, public menu:MenuController) { }
  /*
  * 메인페이지의 검은색 바에 있는 버튼을 의미.
  * index의 값에 따라 구분한다.
  * 0 -> 전주
  * 1 -> 익산
  * 2 -> 군산
  * */
  region_button_click(index) {
    switch(index) {
      case 0: this.nav.push(BuildCaseListPage, {region:"전주"}); break;
      case 1: this.nav.push(BuildCaseListPage, {region:"익산"}); break;
      default: this.nav.push(BuildCaseListPage, {region:"군산"});
    }
  }
  /*
  * 다른 페이지에서 사이드메뉴를 허용하지 않기 위해서
  * home을 떠날 때 menu를 사용하지 못하도록 해준다.
  * 만약 menu를 사용하고 싶은 페이지가 있다면
  * 해당 페이지의 생성자 부분에서 enable을 true로 설정해준다. */
  ionViewWillLeave() {
    this.menu.enable(false);
  }

  /*
  * 다시 home 페이지로 돌아올 경우, 메뉴를 사용할 수 있도록
  * enable을 true로 설정.
  * */
  ionViewDidEnter() {
    this.menu.enable(true);
    this.menu.close();
  }

}
