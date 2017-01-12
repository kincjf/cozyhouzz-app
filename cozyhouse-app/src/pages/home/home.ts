import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostService } from '../../services/post-service';
import { PostPage } from '../post/post';
import { BuildCaseListPage } from '../buildCase/build-case-list/build-case-list';

//import {UserPage} from '../user/user';
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public posts: any;
  public test: any;
  constructor(public nav: NavController, public postService: PostService) {
    this.nav = nav;

  }
  region_button_click(index) {
    switch(index) {
      case 0:
        this.nav.setRoot(BuildCaseListPage, {region:"전주"});
        break;
      case 1:
        this.nav.setRoot(BuildCaseListPage, {region:"익산"});
        break;
      default:
        this.nav.setRoot(BuildCaseListPage, {region:"군산"});

    }
  }
  navigation_button_click(index) {

      console.log(index);
  }
  toggleLike(post) {
    // if user liked
    if(post.liked) {
      post.likeCount--;
    } else {
      post.likeCount++;
    }

    post.liked = !post.liked
  }

  // on click, go to post detail
  viewPost(postId) {
    this.nav.push(PostPage, {id: postId})
  }
/*
  // on click, go to user timeline
  viewUser(userId) {
    this.nav.push(UserPage, {id: userId})
  }
  */
}
