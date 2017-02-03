"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var mock_posts_1 = require("./mock-posts");
var PostService = (function () {
    function PostService(http) {
        this.http = http;
        this.posts = mock_posts_1.POSTS;
    }
    PostService.prototype.getAll = function () {
        return this.posts;
    };
    //build case list
    PostService.prototype.getBuildList = function (url) {
        //HTTP.get('http://api.cozyhouzz.co.kr/api/build-case?pageSize=10&pageStartIndex=0', {}, {})
        return this.http.get(url)
            .map(function (x) {
            console.log(x);
            return x.json();
        });
    };
    PostService.prototype.getNoticeBoardList = function (url) {
        return this.http.get(url)
            .map(function (x) {
            return x.json();
        });
    };
    // 상세보기
    PostService.prototype.getroomInfoInfo = function (url) {
        return this.http.get(url) //서버로부터 필요한 값 받아오기
            .map(function (res) {
            return res.json();
        });
    };
    PostService.prototype.getItem = function (id) {
        for (var i = 0; i < this.posts.length; i++) {
            if (this.posts[i].id === parseInt(id)) {
                return this.posts[i];
            }
        }
        return null;
    };
    PostService.prototype.remove = function (item) {
        this.posts.splice(this.posts.indexOf(item), 1);
    };
    PostService = __decorate([
        core_1.Injectable()
    ], PostService);
    return PostService;
}());
exports.PostService = PostService;
