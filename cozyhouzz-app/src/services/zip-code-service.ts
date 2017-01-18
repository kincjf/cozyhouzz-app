import { Injectable } from "@angular/core";
import {Http, Headers} from '@angular/http';
import { Storage } from '@ionic/storage';
import { Events, Platform } from 'ionic-angular';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

/*
* 우편번호 관련 API를 호출하는 부분.
* */
@Injectable()
export class ZipCodeService {

    constructor(public http:Http, public storage:Storage, public events:Events, public platform:Platform) {

    }
    getAddressList(current_page, countPerPage, keyword) {
      console.log("getAddressList()");
      let url = '/api';
      if (this.platform.is('cordova')) {
        url = 'http://npus.kr:4000';
      }
      console.log(url);
      ///api and ip
      return this.http.post(url, {
        current_page: current_page,
        keyword: keyword,
        countPerPage: countPerPage
      }, {})
      .map(x => {
          return JSON.parse(x.json());
      });
    }

}

