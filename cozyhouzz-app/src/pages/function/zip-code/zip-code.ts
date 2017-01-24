import {Component} from '@angular/core';
import {AlertController, NavController, MenuController, Events} from 'ionic-angular';
import {ZipCodeService} from '../../../services/zip-code-service';
import {Validators, FormBuilder} from '@angular/forms';
import {Loader} from "../../../providers/loader";

/*
 Generated class for the ZipCode page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-zip-code',
  templateUrl: 'zip-code.html'
})
export class ZipCodePage {
  public juso_list: any = null;
  public zip_code: any;
  private countPerPage: number = 10;
  private current_page: number;
  public addButton: boolean = false;

  constructor(public navCtrl: NavController, private menu: MenuController, private zipcode: ZipCodeService,
              private alertCtrl: AlertController, private formBuilder: FormBuilder, private events: Events, private loader: Loader) {
  }

  ionViewWillLoad() {
    // Validate user registration form
    this.zip_code = this.formBuilder.group({
      juso: ['', Validators.required]
    });

  }

  /**
   * 사용자가 주소를 입력했을 경우, 해당 주소를 파라미터로 하는 api를 호출하는 부분.
   */
  getAddressList() {
    this.loader.show("정보를 불러오고 있습니다.");

    this.current_page = 1;
    this.countPerPage = 10;
    this.addButton = false;
    if (this.zip_code.controls.juso.value.length > 0) {
      this.zipcode.getAddressList(this.current_page, this.countPerPage, this.zip_code.controls.juso.value).toPromise()
        .then(
          response => {
            this.juso_list = response.results.juso;
            if (response.results.errorCode != "0") {
              // error있는 부분
            }
            if (this.juso_list.length >= 10) {
              this.addButton = true;
            }
            this.loader.hide();
          },
          err => {
            this.loader.hide();
            this.alertCtrl.create({
              title: 'Error',
              message: 'Failed to login ' + err,
              buttons: [{text: 'Ok'}]
            }).present();
          }
        );
    }
  }

  /**
   *
   * @param infiniteScroll infiniteScroll 객체
   * 사용자가 입력한 주소로 하여금 주소의 리스트를 추가로 받아오는 부분.
   */
  doInfinite(infiniteScroll: any) {
    console.log("doInfinite");
    if (this.juso_list != null) {
      this.current_page += 1;
      this.zipcode.getAddressList(this.current_page, this.countPerPage, this.zip_code.controls.juso.value).toPromise()
        .then(
          response => {
            if (response.results.juso.length == 0) {
              this.addButton = false;
              infiniteScroll.enable(false);
            }
            for (let v in response.results.juso)  this.juso_list.push(response.results.juso[v]);
            infiniteScroll.complete();
          },
          err => {
            this.alertCtrl.create({
              title: 'Error',
              message: 'Failed to get address list ' + err,
              buttons: [{text: 'Ok'}]
            }).present();
            infiniteScroll.enable(false);
            infiniteScroll.complete();
          }
        );
    }
  }

  /**
   *
   * @param p 사용자가 선택한 주소의 정보를 담고 있다.
   * 이때 주소가 바뀌었으므로 주소가 선택되었다는 이벤트를 발생시킨다.
   *
   * 이는 RoomInputPage에서 처리하도록 구현되어 있다.
   * 또한 페이지를 pop 시킨다.
   */
  selectAddress(p) {
    this.events.publish('address:choiced', p);
    this.navCtrl.pop(p);
  }
}
