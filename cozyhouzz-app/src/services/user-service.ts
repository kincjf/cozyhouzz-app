import {Injectable} from "@angular/core";
import {Http, RequestOptions} from '@angular/http';
import {Storage} from '@ionic/storage';
import {Events} from 'ionic-angular';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';

import {config} from '../app/common/config';
/*
 * 로그인과 회원가입, 비밀번호 찾기등을 도맡아할 user-service.ts
 * */
@Injectable()
export class UserService {
  private isLogind;
  private user: any;
  public decodedJwt: any;
  public jwtHelper: JwtHelper;
  jwt: string;

  constructor(public http: Http, public storage: Storage, public events: Events) {
    /*
     * 초기 상태는 비로그인 상태이므로 isLogined는 false로 세팅한다.
     * 앱이 실행되면 UserService의 constructor가 아닌
     * app.component.ts에서 storage를 먼저 확인한다. src/app/app.component.ts
     * */
    this.isLogind = false;
    this.jwtHelper = new JwtHelper();
  }

  login(url, user) {
    return this.http.post(url, user)
      .map(x => {
        return x.json();
      });
  }

  /**
   * 로그아웃에 대한 것을 처리하는 부분.
   * user, isLogined를 초기화 하고 storage에 저장되어있는 토근에 대한 정보를 삭제한다.
   *
   * 1) menu 페이지에 로그아웃이 됬음을 알리는 이벤트를 발행 user:logout
   * 2) roomInfoList 페이지에 로그아웃이 됬음을 알리는 이벤트를 발생 roomInfoList:logout
   * */
  logout() {
    this.user = null;
    this.isLogind = false;
    this.jwt = null;
    this.storage.remove("id_token");

    this.events.publish('user:logout', '');
    this.events.publish('roomInfoList:logout', '');//mypage:logout
    this.events.publish('mypage:logout', '');//mypage:logout
  }

  /**
   * 로그인이 되면 setUserInfo함수가 호출되도록 구현해놓았음.
   * 여기서는 로그인이 되었으므로 userService의 멤버변수 값을 바꾸고
   * 각기 등록해놓은 페이지들에게 이벤트를 발생시켜주는 것을 담당한다.
   *
   * 1) roomInfoList:logined는 RoomListPage에
   * 2) user:logined는 menu 페이지에 이벤트 리스너를 등록시켜 놓았다.
   * 해당 페이지에 가서 생성자를 확인해 보면 된다.
   * */
  setUserInfo(jwt) {
    this.isLogind = true;
    this.jwt = jwt;
    this.user = this.jwtHelper.decodeToken(jwt);
    console.log(this.user);
    this.storage.set("id_token", jwt);

    this.events.publish('roomInfoList:logined', '');
    this.events.publish('user:logined', '');
    this.events.publish('mypage:logined', '');
  }

  /**
   * 사용자 정보를 반환하는 함수
   * */
  getUserInfo() {
    return this.user;
  }

  /**
   * 사용자 정보를 초기화 하는 함수
   * logout()와 달리 쓸곳이 있을지 몰라 만들어 놓음.
   * */
  removeUserInfo() {
    this.jwt = null;
    this.user = null;
    this.isLogind = false;
    this.storage.remove("id_token");
  }

  setIsLogind(flag) {
    this.isLogind = flag;
  }

  /**
   * 로그인 여부를 반환하는 함수.
   * 아래처럼 사용하면 되도록 만들었음.
   * if(userServie.getIsLogined()) {
  *     //로그인 됨.
  * } else {
  *     //로그인 안됨.
  * }
   * */
  getIsLogind() {
    return this.isLogind;
  }

  /**
   * 현재 로그인 되어있는 유저의 jwt 토큰을 반환.
   * cozyhouzz-client 보니까 jwt 토큰을 headers에 추가하던데.
   * 그때 사용하려고 만듬.
   * */
  getJwtToken() {
    return this.jwt;
  }

  /**
   *
   * @param email
   */
  createUser(url, user) {
    return this.http.post(url, user)
      .map(x => {
        return x.json();
      });
  }
  modifyUserDetailInfo(user, header){
    let options = new RequestOptions({ headers: header });
    let URL = [config.serverHost, config.path.userInfoModify].join('/');
    return this.http.post(URL, user, options)
      .map(x => {
        return x.json();
      });

  }
  getUserDetailInfo(user, header) {
    let options = new RequestOptions({ headers: header });
    let URL = [config.serverHost, config.path.userInfo].join('/');
    return this.http.post(URL, {email: user.email, password: user.password}, options)
      .map(x => {
        return x.json();
      });
  }
  signOut(user, header) {
    let options = new RequestOptions({ headers: header });
    let URL = [config.serverHost, config.path.signout].join('/');
    return this.http.post(URL, {email: user.email}, options)
      .map(x => {
        return x.json();
      });
  }
}
