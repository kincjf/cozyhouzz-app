import {ViewChild, Injectable} from "@angular/core";
import {Platform} from 'ionic-angular';
@Injectable()
export class Shrink {
  scrollPosition: number = 0;
  lastScrollTop: number = 0;
  style: any;
  height: number;

  constructor(private platform: Platform) {

    this.platform = platform;
    if (this.platform.is('ios')) {
      this.height = 44;
    } else {
      //android
      this.height = 56;
    }

  }

  returnStyle() {
    return this.style;
  }
  init(content) {
    content.addScrollListener((event) => {
      this.scrollPosition = event.target.scrollTop;
      if (this.scrollPosition > this.lastScrollTop && this.scrollPosition >= 5) {
        // Scrolling Down
        this.style = { 'transform': 'translateY(-' + this.height + 'px)', 'transition': 'all 0.3s linear' }
      }
      else {
        // Scrolling up
        this.style = { 'transform': 'translateY(0px)', 'transition': 'all 0.3s linear' }
      }
      this.lastScrollTop = this.scrollPosition;
    });
  }
}
