import {Injectable} from "@angular/core";
import {POSTS} from "./mock-posts";
import { Http } from '@angular/http';

@Injectable()
export class PostService {
  private posts: any;
  private http: Http;

  constructor(http: Http) {
    this.http = http;
    this.posts = POSTS;
  }
  getAll() {
    return this.posts;
  }
  //build case list
  getBuildList(url) {
    //HTTP.get('http://api.cozyhouzz.co.kr/api/build-case?pageSize=10&pageStartIndex=0', {}, {})
    return this.http.get(url)
      .map(x => {
        console.log(x);
        return x.json();
      });
  }
  getNoticeBoardList(url) {
    return this.http.get(url)
      .map(x => {
        return x.json();
      });
  }

  // 상세보기
  getroomInfoInfo(url) {
    return this.http.get(url) //서버로부터 필요한 값 받아오기
      .map(res => {
        return res.json();
      });
  }

  getItem(id) {
    for (var i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id === parseInt(id)) {
        return this.posts[i];
      }
    }
    return null;
  }

  remove(item) {
    this.posts.splice(this.posts.indexOf(item), 1);
  }
}
