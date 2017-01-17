import {Directive, Renderer, ElementRef} from '@angular/core';
import {Keyboard} from 'ionic-native';


@Directive({
  selector: '[focuser]' // Attribute selector
})
export class Focuser {
  constructor(private renderer:Renderer, private elementRef:ElementRef) {
  }
  ngAfterViewInit() {
    console.log("sdfdsf11111");
    const element = this.elementRef.nativeElement.querySelector('input');
    // we need to delay our call in order to work with ionic ...
    setTimeout(() => {
      console.log("11112222");
      this.renderer.invokeElementMethod(element, 'focus', []);
      Keyboard.show();
    }, 150);
  }
}
