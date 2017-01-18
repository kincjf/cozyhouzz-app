import {Component, ViewChild} from '@angular/core';
import {Content} from 'ionic-angular';

@Component({
  selector: 'page-question-detail',
  templateUrl: 'question-detail.html'
})
export class QuestionDetailPage {
  @ViewChild(Content) content: Content;

  userDetails: any;
  chatControl: any;


  constructor() {
  }
}
