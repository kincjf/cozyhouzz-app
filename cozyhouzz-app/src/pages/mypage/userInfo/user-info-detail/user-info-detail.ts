import {Component} from '@angular/core';
import {NavController, MenuController, Events, AlertController} from 'ionic-angular';
import {UserService} from '../../../../services/user-service';
import {FormBuilder, Validators} from "@angular/forms";
import {contentHeaders} from '../../../../app/common/headers';
import {Loader} from "../../../../providers/loader";

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
  userDetails: any = null;
  userFormBuilder: any;
  bussinessUserFormBuilder: any;

  user: any;
  isLogined:boolean = false;

  constructor(public navCtrl: NavController, public menu: MenuController, public userService: UserService,
              private formBuilder: FormBuilder, private alertCtrl:AlertController,
              private loader: Loader, private events: Events) {
    this.bussinessUserFormBuilder = this.formBuilder.group({
      email: ['', Validators.required],
      display_name: ['',null],
     /* businessName: ['', Validators.required],
      businessAddress: ['', Validators.required],
*/      telephone: ['', Validators.required],
      password: ['', Validators.required],
      new_password: ['', null]
    });
    this.userFormBuilder = this.formBuilder.group({
      email: ['', Validators.required],
      display_name: ['', null],
      telephone: ['',null],
      password: ['', Validators.required],
      new_password: ['', null]
    });
  }
  ionViewWillEnter() {
    this.isLogined = this.userService.getIsLogind();
    if (this.isLogined) {
      this.user = this.userService.getUserInfo();
      contentHeaders.set('Authorization', this.userService.getJwtToken());//Header에 jwt값 추가하기

      /*
       * memberType에 따라서 입력해야 하는 것들이 달라짐.
       * ionViewDidLoad에서 처리하면 이미 늦음.
       * 반드시 생성자에서 처리해주어야 함.
       *
       * user.memberType에 따라서 나중에 request할때 파라미터도 달라져야 함.
       * */
      console.log(this.userService.getJwtToken());
      this.userDetails = this.user;
      this.userService.getUserDetailInfo(this.user, contentHeaders).toPromise()
        .then(
          response => {
            //this.userDetails = response.user_info[0];
            console.log(this.userDetails);
          }, error => {
            console.log(error);
          }
        );
    }
  }
  /**
   * 정보 수정 버튼을 클릭했을 경우 수행되는 함수.
   * 수정 페이지로 이동하도록 함.
   *
   * 아마도 여기서 정보다 보내줘야 할 듯. 두번 리퀘스트 할 수는 없으니까..
   */
  userInfoModify() {
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

    this.loader.show("정보를 수정하고 있습니다.");

    let member_type = this.user.member_type;

    let display_name = this.userFormBuilder.value.display_name;
    let telephone = this.userFormBuilder.value.telephone;
    let email = this.userFormBuilder.value.email;
    let password =this.userFormBuilder.value.password;
    let new_password =this.userFormBuilder.value.new_password;

    let user_info = { };

    console.log(user_info);
    if(member_type == 'PUBLIC') {
        user_info =  {
          display_name:display_name,
          email:email,
          password:password,
          telephone:telephone,
          member_type: 'PUBLIC',
          new_password:new_password
        };
    } else if('BUSINESS') {
      user_info =  {
        display_name:display_name,
        email:email,
        password:password,
        telephone:telephone,
        member_type: 'BUSINESS',
        new_password:new_password
      };
    }
    this.userService.modifyUserDetailInfo(user_info, contentHeaders).toPromise()
      .then(
        response => {
          //this.userDetails = response.user_info[0];
          console.log(response);
          let statusCode = response.statusCode;
          if(statusCode==1) {
              this.loader.hide();
              this.userService.removeUserInfo();
              this.userService.setUserInfo(response.id_token);
              this.navCtrl.pop();
          }
        }, error => {

          this.loader.hide();
          let status = error.status;
          if(status==401) {
            this.alertCtrl.create({
              title: 'Error',
              message: '이전 비밀번호가<br>일치하지 않습니다.',
              buttons: [{text: 'Ok'}]
            }).present();
          }
        }
      );

  }
}
