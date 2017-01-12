import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ImagePicker } from 'ionic-native';

/*
  Generated class for the ImagePicker page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-image-picker',
  templateUrl: 'image-picker.html'
})
export class ImagePickerPage {

  options = {};
  constructor(public navCtrl: NavController) {
     this.options = {

     }
  }

  ionViewDidLoad() {
    console.log('Hello ImagePickerPage Page');
    ImagePicker.getPictures(this.options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => { });
  }

}
