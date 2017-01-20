import { Component, ViewChild } from '@angular/core';

import { Validators, FormBuilder } from '@angular/forms';
import { NavController, Content } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthenticatorService } from "../../../../providers/authenticator";
import { Loader } from '../../../../providers/loader';
import { User } from "../../../../providers/user";



@Component({
  selector: 'page-question-list',
  templateUrl: 'question-list.html'
})
export class QuestionListPage {
  @ViewChild(Content) content: Content;

  userDetails: User;
  chatControl: any;


  message: string = '';

  messages: any[] = [];
  constructor(
    public navCtrl: NavController,
    public af: AngularFire,
    private loader: Loader,
    private formBuilder: FormBuilder,
    private authenticatorService: AuthenticatorService
  ) {


  }

}
