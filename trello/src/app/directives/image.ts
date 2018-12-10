import { Directive, HostListener, Input, ElementRef, HostBinding } from '@angular/core';
@Directive({
  selector: "[handleImage]"
})
export class ErrorImage {
  @Input('handleImage') brokenImageClasss;
  @HostBinding('class')
  elementClass = 'small-avatar';
  constructor(private el: ElementRef) {
  }
  @HostListener("error", ["$event"]) // Add event listener na itemku oznaczonym dyrektowa, nizej funkcja, ktora bedzie wykonywana
  handleBrokenImage(event) {
    this.el.nativeElement.src = '../../assets/broken-image.svg';
    this.elementClass = this.elementClass + ' ' + this.brokenImageClasss + ' broken-image';
  }
}
