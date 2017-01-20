import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { BuildCaseListPage } from '../buildCase/build-case-list/build-case-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public posts: any;
  public test: any;
  constructor(public nav: NavController, public menu:MenuController) { }
  /**
   *
   * @param index 0, 1, 2에 따라 전주, 익산, 군산으로 나뉨.
   * 해당 페이지로 이동하는 함수
   */
  //this.navCtrl.parent.select(2);
  region_button_click(index) {
    this.nav.parent.select(1);
    /*
    switch(index) {
      case 0: this.nav.push(BuildCaseListPage, {region:"전주"}); break;
      case 1: this.nav.push(BuildCaseListPage, {region:"익산"}); break;
      default: this.nav.push(BuildCaseListPage, {region:"군산"});
    }*/
  }
  /**
  * 다른 페이지에서 사이드메뉴를 허용하지 않기 위해서
  * home을 떠날 때 menu를 사용하지 못하도록 해준다.
  * 만약 menu를 사용하고 싶은 페이지가 있다면
  * 해당 페이지의 생성자 부분에서 enable을 true로 설정해준다. */
  ionViewWillLeave() {
  }

  /**
  * 다시 home 페이지로 돌아올 경우, 메뉴를 사용할 수 있도록
  * enable을 true로 설정.
  * */
  ionViewDidEnter() {
  }

}
