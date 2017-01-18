import {Component} from '@angular/core';
import {NavController, MenuController} from 'ionic-angular';
import {Validators, FormBuilder} from '@angular/forms';
import {GeneralRegistrationPage} from '../registration/general-user/registration';
import {AlertController, Events} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {UserService} from '../../../services/user-service';
import {HomePage} from '../../home/home';
import {config} from '../../../app/common/config';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  userFormBuilder: any;

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              public menu: MenuController,
              public storage: Storage,
              public userService: UserService) {
    /*
     * 로그인 페이지로 이동하기 때문에 사이드 메뉴를 닫는다.
     * 또한 메인페이지와 buildCaseListPage를 제외한 나머지 페이지에서는 사이드 메뉴를 허용하지 않기 때문에
     * menu의 enable을 false로 설정해준다. */
    this.menu.close();
    this.menu.enable(false);
  }

  /*
   * formBuilder 따로 설명 필요 없음. login.html 부분 보면 됨.
   * */
  ionViewWillLoad() {
    this.userFormBuilder = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /*
   * 사용자가 로그인 버튼을 클릭했을 때 호출되는 함수.
   * eamil과 password를 가져오고 이를 통해 서버와 통신한다.
   * */
  login() {
    let email = this.userFormBuilder.controls.email.value;
    let password = this.userFormBuilder.controls.password.value;

    /*
     * service/user-service.ts 부분에 함수가 작성되어 있음.
     * url를 보내면 userService는 해당 url에 같이 보낸 파라미터를 가지고 request를 하고
     * 해당 request의 response 를 반환한다.
     * 이후 .toPromise()를 통해 해당 데이터를 조회.
     * */
    // let URL = [config.serverHost, config.path.login].join('/');
    let user = this.userService.login("http://api.cozyhouzz.co.kr/api/auth/login", {
      email: email,
      password: password
    }).toPromise()
      .then(
        response => {
          /*
          * 로그인이 되었을 경우 데이터가 존재한다.
          * 1) id_token을 storage에 저장한다.
          * 2) userService에 해당 유저 정보를 저장한다. userService에서 해당 토큰을 decode하고 해당 정보를 가지고 있는다.
          * 3) 로그인이 완료되었으므로 원래 페이지로 돌아가야 함. pop()
          * */
          this.storage.set("id_token", response.id_token);
          this.userService.setUserInfo(response.id_token);
          this.navCtrl.pop();
        },
        err => {
          /*
          * 로그인이 제대로 되지 않은 경우.
          * 400대 status code가 오므로 err부분에서 처리해줘야함..
          * 서버에서 그리 구현하였음.
          * */
          this.alertCtrl.create({
            title: 'Error',
            message: 'Failed to login ' + err,
            buttons: [{text: 'Ok'}]
          }).present();
        }
      );
  }

  signUp() {
    this.navCtrl.push(GeneralRegistrationPage);
  }

  resetPassword() {

  }

}
