import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import {Storage} from '@ionic/storage';
import {Events} from 'ionic-angular';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class UserService {
  private isLogind;
  private user: any;
  private storage: Storage;
  public decodedJwt: any;
  public jwtHelper: JwtHelper;
  jwt: string;
  http: Http;

  constructor(public Http: Http, public Storage: Storage, public events: Events) {
    this.http = Http;
    this.storage = Storage;
    this.isLogind = false;
    this.jwtHelper = new JwtHelper();
  }

  login(url, user) {
    return this.http.post(url, user)
      .map(x => {
        return x.json();
      });
  }

  logout() {

    this.user = null;
    this.isLogind = false;
    this.storage.remove("id_token");


    this.events.publish('user:logout', '');//user:logined
    this.events.publish('buildCaseList:logout', '');//user:logined
  }

  setUserInfo(jwt) {
    this.isLogind = true;
    this.user = this.jwtHelper.decodeToken(jwt);
    this.events.publish('buildCaseList:logined', '');//buildCaseList
    this.events.publish('user:logined', '');//buildCaseList
  }

  getUserInfo() {
    return this.user;
  }

  removeUserInfo() {
    this.user = null;
    this.isLogind = false;
    this.storage.remove("id_token");
  }

  setIsLogind(flag) {
    this.isLogind = flag;
  }

  getIsLogind() {
    return this.isLogind;
  }
}
