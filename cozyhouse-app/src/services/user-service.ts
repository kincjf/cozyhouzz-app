import { Injectable } from "@angular/core";
import { USERS } from "./mock-users";
import { Http } from '@angular/http';
import { User } from "../providers/user";
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

@Injectable()
export class UserService {
  private users;
  private isLogind;
  private user:User;
  private userInfo;
  private storage:Storage;
  http : Http;
  constructor(public h:Http, public s:Storage, public events:Events) {
    this.users = USERS;
    this.http = h;
    this.storage = s;
    this.isLogind = false;

  }
  getAll() {
    return this.users;
  }

  getItem(id) {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].id === parseInt(id)) {
        return this.users[i];
      }
    }
    return null;
  }

  remove(item) {
    this.users.splice(this.users.indexOf(item), 1);
  }
  login(url, user) {
    return this.http.post(url, user)
      .map(x => {
        return x.json();
      });
  }
  setUserInfo(user) {
    this.user = user;
    this.isLogind = true;
    this.events.publish('user:logined', '');//user:logined
  }
  getUserInfo() {
    return this.user;
  }
  removeUserInfo() {
    this.user = null;
    this.isLogind = false;
    this.storage.remove("user");
  }
  setIsLogind(flag) {
    this.isLogind = flag;
  }
  getIsLogind() {
    return this.isLogind;
  }
}
