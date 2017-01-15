import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavController, Content } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Loader } from '../../../providers/loader';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public af: AngularFire,
    private loader: Loader,
    private formBuilder: FormBuilder
  ) { }

  logout() {
    this.navCtrl.pop();
  }
}
