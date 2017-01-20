import {Component} from '@angular/core';
import {NavController, MenuController} from 'ionic-angular';
import {UserService} from '../../../../services/user-service';
import {UserInfoModifyPage} from '../user-info-modify/user-info-modify';
import {FormBuilder, Validators} from "@angular/forms";
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
  userDetails: any;
  userFormBuilder: any;
  user: any;

  constructor(public navCtrl: NavController, public menu: MenuController, public userService: UserService,
              private formBuilder: FormBuilder) {

    if (this.userService.getIsLogind()) {
      this.user = this.userService.getUserInfo();

      /*
       * memberType에 따라서 입력해야 하는 것들이 달라짐.
       * ionViewDidLoad에서 처리하면 이미 늦음.
       * 반드시 생성자에서 처리해주어야 함.
       *
       * user.memberType에 따라서 나중에 request할때 파라미터도 달라져야 함.
       * */
      if (this.user.memberType == 'PUBLIC') {
        this.userFormBuilder = this.formBuilder.group({
          email: ['', Validators.required],
          fullName: ['', Validators.required],
          businessName: ['', Validators.required],
          businessAddress: ['', Validators.required],
          cellPhone: ['', Validators.required]
        });
      } else if (this.user.memberType != 'PUBLIC') {
        this.userFormBuilder = this.formBuilder.group({
          email: ['', Validators.required],
          fullName: ['', Validators.required],
          cellPhone: ['', Validators.required]
        });
      }

      userService.getUserDetailInfo('pastelbook89@gmail.com').toPromise()
        .then(
          response => {
            console.log(response);

          }, error => {
            console.log(error);
          }
        );
    }
    console.log(this.user);
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


  updateUserSettings() {

    /*console.debug("updating user details on firebase " + this.constructor.name);
     var update_info;
     let fullName = this.userDetails.fullName;
     let cellPhone = this.userDetails.cellPhone;
     if (this.userDetails.delimiter == 0) {
     update_info = {fullName: fullName, cellPhone: cellPhone};
     } else if (this.userDetails.delimiter == 1) {
     let businessAddress = this.userDetails.businessAddress;
     let businessName = this.userDetails.businessName;
     update_info = {
     fullName: fullName,
     cellPhone: cellPhone,
     businessAddress: businessAddress,
     businessName: businessName
     };
     }

     this.loader.show("Updating your settings...");
     this.userDetails.update(update_info)
     .then((user) => {
     this.loader.hide();
     this.alertCtrl.create({
     title: 'Success',
     message: 'Details updated',
     buttons: [{text: 'Ok'}]
     }).present();
     this.navCtrl.pop();
     })
     .catch((e) => {
     this.loader.hide();
     console.error(`Password Login Failure:`, e)
     this.alertCtrl.create({
     title: 'Error',
     message: `Failed to update details. ${e.message}`,
     buttons: [{text: 'Ok'}]
     }).present();
     });*/
  }
}
