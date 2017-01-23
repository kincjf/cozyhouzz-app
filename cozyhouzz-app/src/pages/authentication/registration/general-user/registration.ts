import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MenuController} from 'ionic-angular';
import {Validators, FormBuilder} from '@angular/forms';
import {AlertController} from 'ionic-angular';
import {Loader} from '../../../../providers/loader';
import {UserService} from '../../../../services/user-service';
/*
 Generated class for the Registration page.
 */
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html'
})
export class GeneralRegistrationPage {
  user: any;
  delimiter: number = 0; // delimiter 1이면 사업자, 0이면 기본 유저
  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              private loader: Loader,
              private alertCtrl: AlertController,
              public menu: MenuController,
              public userService: UserService) {

    this.menu.close();

  }

  ionViewWillLoad() {
    // Validate user registration form
    this.user = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      passwordConfirmation: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  // Create user using form builder controls
  createUser() {
    let email = this.user.controls.email.value;
    let password = this.user.controls.password.value;
    let passwordConfirmation = this.user.controls.passwordConfirmation.value;

    if (password != passwordConfirmation) {
      this.alertCtrl.create({
        title: 'Error',
        message: '비밀번호가 일치하지 않습니다.',
        buttons: [{text: 'Ok'}]
      }).present();
      return 0;
    }
    let url = 'http://npus.kr:3000/api/register';
    let user = {
      email: email,
      password: password,
      member_type: 'PUBLIC'
    };


    /*
     * 회원가입 요청하는 부분.
     * userService의 createUser 함수가 담당하고 있음.
     * 회원가입이 완료되면 바로 로그인 수행함.
     * */
    this.loader.show("회원 가입 중입니다.");
    this.userService.createUser(url, user).subscribe(response => {
      this.userService.setUserInfo(response.id_token);
      this.loader.hide();
      this.navCtrl.parent.select(4);
    }, error => {
      this.loader.hide();
      /*
      console.log(error);
       console.log(JSON.parse(error._body).errorMsg);
       */
      let errorMsg = JSON.parse(error._body).errorMsg;
      this.alertCtrl.create({
        title: 'Error',
        message: errorMsg,
        buttons: [{text: 'Ok'}]
      }).present();
    });
  }
}
