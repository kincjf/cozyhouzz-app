import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { PostService } from '../../services/post-service';
import { BuildCaseListPage } from '../buildCase/build-case-list/build-case-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public posts: any;
  public test: any;
  constructor(public nav: NavController, public postService: PostService, public menu:MenuController) { }
  region_button_click(index) {
    switch(index) {
      case 0: this.nav.push(BuildCaseListPage, {region:"전주"}); break;
      case 1: this.nav.push(BuildCaseListPage, {region:"익산"}); break;
      default: this.nav.push(BuildCaseListPage, {region:"군산"});
    }
  }
  ionViewDidEnter() {
    this.menu.enable(true);
  }
  ionViewWillLeave() {
    this.menu.enable(false);
  }
}
