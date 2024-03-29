import { Directive, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[outsideClick]',
})
export class OutsideClickDirective {

  @Output() outsideClick = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  public onClick(target) {
    const clickedInside = this.elementRef.nativeElement.contains(target);

    if (!clickedInside && !String(target.outerHTML).includes("<rect") && window.innerWidth < 576) {
      this.outsideClick.emit();
    }
  }
}