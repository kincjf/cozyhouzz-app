"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var IonShrinkingHeader = (function () {
    function IonShrinkingHeader(el, renderer, platform) {
        this.el = el;
        this.renderer = renderer;
        this.platform = platform;
        this.lastScrollTop = 0;
        this.shrinkAmount = 0;
        this.ticking = false;
        this.iOSStatusBarHeight = 20;
        this.ionHeaderElement = this.el.nativeElement;
    }
    IonShrinkingHeader.prototype.ngOnInit = function () {
        if (this.content === undefined || this.content === null) {
            console.error('IonShrinkingHeader - content is not defined.');
            return;
        }
        this.headerHeight = this.ionHeaderElement.offsetHeight;
        // retrieves the different elements
        this.toolbarElement = this.queryElement(this.ionHeaderElement, '.toolbar');
        if (!this.toolbarElement) {
            console.error('IonShrinkingHeader - no ion-navbar element found.');
            return;
        }
        // retrieves the different elements
        this.ionContentElement = this.queryElement(this.ionHeaderElement.parentElement, '.scroll-content');
        if (!this.ionContentElement) {
            console.error('IonShrinkingHeader - no .scroll-content element found. Scroll must be enabled on your ion-content.');
            return;
        }
        // bind the scroll event to the content
        var cb = this.onContentScroll.bind(this);
        this.onContentScrollUnbind = this.renderer.listen(this.ionContentElement, 'scroll', cb);
    };
    IonShrinkingHeader.prototype.onContentScroll = function (e) {
        var _this = this;
        var scrollTop = e.detail ? e.detail.scrollTop : (e.target ? e.target.scrollTop : 0);
        // add boundaries to scrollTop to support iOS bouncing scroll
        if (scrollTop < 0) {
            scrollTop = 0;
        }
        console.log(this.content.contentHeight);
        if (scrollTop > this.content.scrollHeight + this.content.contentHeight + this.headerHeight + this.iOSStatusBarHeight) {
            scrollTop = this.content.scrollHeight + this.content.contentHeight + this.headerHeight + this.iOSStatusBarHeight;
        }
        if (scrollTop > this.lastScrollTop) {
            this.shrinkAmount =
                this.headerHeight
                    - Math.max(0, this.headerHeight
                        - this.shrinkAmount
                        - (scrollTop - this.lastScrollTop));
        }
        else {
            this.shrinkAmount =
                Math.max(0, this.headerHeight
                    - (this.headerHeight - this.shrinkAmount)
                    - (this.lastScrollTop - scrollTop));
        }
        if (!this.ticking) {
            window.requestAnimationFrame(function () {
                var amount = Math.min(_this.headerHeight, _this.shrinkAmount);
                // update the margin top of the content element
                _this.ionContentElement.style.marginTop = (_this.headerHeight - amount + (_this.isIos() ? _this.iOSStatusBarHeight : 0)) + 'px';
                // move the header bar
                _this.ionHeaderElement.style.webkitTransform = 'translate3d(0, -' + amount + 'px, 0)';
                // update header elements opacity
                for (var i = 0; i < _this.toolbarElement.children.length; i++) {
                    var elem = _this.toolbarElement.children[i];
                    if (!elem.classList.contains('toolbar-background')) {
                        elem.style.opacity = (1 - _this.shrinkAmount / _this.headerHeight).toString();
                    }
                }
                _this.ticking = false;
            });
        }
        this.ticking = true;
        this.lastScrollTop = scrollTop;
    };
    IonShrinkingHeader.prototype.isIos = function () {
        return (this.platform.is('ios'));
    };
    IonShrinkingHeader.prototype.ngOnDestroy = function () {
        this.onContentScrollUnbind();
    };
    IonShrinkingHeader.prototype.queryElement = function (elem, q) {
        return elem.querySelector(q);
    };
    __decorate([
        core_1.Input('ion-shrinking-header')
    ], IonShrinkingHeader.prototype, "content", void 0);
    IonShrinkingHeader = __decorate([
        core_1.Directive({
            selector: '[ion-shrinking-header]',
        })
    ], IonShrinkingHeader);
    return IonShrinkingHeader;
}());
exports.IonShrinkingHeader = IonShrinkingHeader;
