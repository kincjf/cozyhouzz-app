import { Injectable } from "@angular/core";
import {Http, Headers} from '@angular/http';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class ZipCodeService {

    constructor(public http:Http, public storage:Storage, public events:Events) {

    }
    getAddressList(current_page, countPerPage, keyword) {
      console.log("getAddressList()");

      ///api and ip
      return this.http.post("http://121.186.7.102:3000", {
        current_page: current_page,
        keyword: keyword,
        countPerPage: countPerPage
      }, {})
      .map(x => {
          return JSON.parse(x.json());
      });
    }

}

