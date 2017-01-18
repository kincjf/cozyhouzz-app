import { Component } from '@angular/core';
import {NavController, MenuController} from 'ionic-angular';
import {UserService} from '../../../../services/user-service';
import {UserInfoModifyPage} from '../user-info-modify/user-info-modify';
/*
  Generated class for the UserInfoDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-info-detail',
  templateUrl: 'user-info-detail.html'
})
/**
 * 마이 페이지라고 생각하면 됨.
 * 내 정보가 아닌 다른 사용자의 정보를 보여주는 페이지는
 * src/page/user/user.ts 부분에서 담당할 것임.
 */
export class UserInfoDetailPage {
  constructor(public navCtrl: NavController, public menu: MenuController, public userService:UserService) {
    this.menu.close();
  }

  /**
   * 정보 수정 버튼을 클릭했을 경우 수행되는 함수.
   * 수정 페이지로 이동하도록 함.
   *
   * 아마도 여기서 정보다 보내줘야 할 듯. 두번 리퀘스트 할 수는 없으니까..
   */
  userInfoModify() {
      this.navCtrl.push(UserInfoModifyPage);
  }

  /**
   * 로그아웃 버튼을 클릭했을 경우.
   * userService.logout() 함수를 호출하고
   * 페이지를 pop()한다.
   */
  logout() {
    this.userService.logout();
    this.navCtrl.pop();
  }
}
