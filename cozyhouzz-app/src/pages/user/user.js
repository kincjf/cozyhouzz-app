"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var UserPage = (function () {
    function UserPage(nav, navParams, userService, postService) {
        // get sample data only
        //this.user = userService.getItem(navParams.get('id'));
        this.nav = nav;
        this.navParams = navParams;
        this.userService = userService;
        this.postService = postService;
        Object.assign(this.user, {
            'followers': 199,
            'following': 48,
            'favorites': 14,
            'posts': postService.getAll()
        });
    }
    UserPage.prototype.toggleLike = function (post) {
        // if user liked
        if (post.liked) {
            post.likeCount--;
        }
        else {
            post.likeCount++;
        }
        post.liked = !post.liked;
    };
    // on click, go to user timeline
    UserPage.prototype.viewUser = function (userId) {
        this.nav.push(UserPage, { id: userId });
    };
    // on click, go to post detail
    UserPage.prototype.viewPost = function (postId) {
    };
    UserPage = __decorate([
        core_1.Component({
            selector: 'page-user',
            templateUrl: 'user.html'
        })
    ], UserPage);
    return UserPage;
}());
exports.UserPage = UserPage;
