import {Component} from '@angular/core';
import {AlertController, NavController, NavParams, MenuController, Events} from 'ionic-angular';
import {ZipCodeService} from '../../../services/zip-code-service';
import {Validators, FormBuilder} from '@angular/forms';

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
  private result: any;
  public juso_list: any = null;
  public zip_code: any;
  private countPerPage: number = 10;
  private current_page: number;
  public addButton: boolean = false;
  private backPageDeligate: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, private zipcode: ZipCodeService,
              private alertCtrl: AlertController, private formBuilder: FormBuilder, private events: Events) {
    this.menu.enable(false); // 현재 login 페이지에서 side menu 사용하도록 해놓음..
  }

  ionViewWillLoad() {
    // Validate user registration form
    this.zip_code = this.formBuilder.group({
      juso: ['', Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ZipCodePage');

  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

  getAddressList() {
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
            console.log(response.results.juso);
          },
          err => {
            this.alertCtrl.create({
              title: 'Error',
              message: 'Failed to login ' + err,
              buttons: [{text: 'Ok'}]
            }).present();
          }
        );
    }
  }

  //addAddressList() {
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

  selectAddress(p) {
    this.events.publish('address:choiced', p);//user:logined
    this.navCtrl.pop(p);
  }
}
