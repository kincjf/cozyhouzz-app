import {Component} from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';
import {NavController, Events} from 'ionic-angular';
import {ZipCodePage} from '../../function/zip-code/zip-code';
import {ImagePicker} from 'ionic-native';
import {isCordovaAvailable} from '../../../services/is-cordova-available';

@Component({
  selector: 'page-build-case-input',
  templateUrl: 'room-input.html'
})
export class RoomInputPage {
  post: any;
  options = {};

  constructor(public navCtrl: NavController, private events: Events,
              private formBuilder: FormBuilder) {
    /*
     * getImagePicture(?) 에서 사용한다.
     * 나중에 options 필요하면 적절하게 넣으면 됨.
     * */
    this.options = {};
    /*
     * 사용자가 zip-code page에서 주소를 선택했을 때 발생하는 이벤트를 처리하는 리스너
     * address에는 사용자가 입력한 주소의 우편번호와 지번 주소가 담겨있다.
     * 이를 현재 페이지 클래스(RoomInputPage)의 formBilder인 post의 address에 값을 가공하여 넣어준다.
     * post:any의 address에 값을 넣어주는 부분.
     * 당연히 이벤트는 page/function/zip-code/zip-code.ts 에서 발생한다. */
    events.subscribe('address:choiced', (address) => {
      this.post.patchValue(
        {
          address: address.zipNo + ' - ' + address.jibunAddr
        }
      );
    });
  }

  ionViewWillLoad() {
    // Validate user registration form
    this.post = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      address: ['', Validators.required],
      zip_code: ['', Validators.required]
    });
  }

  /**
   * 우편번호 찾는 페이지로 이동하는 부분
   * */
  addressInputClick() {
    this.navCtrl.push(ZipCodePage);
  }

  /**
   * 현재 테스트 중으로 imagePicker을 이용하는 부분.
   * 이또한 native 기능으로써 isCordovaAvailable함수를 통해서
   * 핸드폰인지 아닌지 확인한다. */
  test() {
    if (!isCordovaAvailable()) {
      return false;
    }
    ImagePicker.getPictures(this.options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => {
    });
  }

}
