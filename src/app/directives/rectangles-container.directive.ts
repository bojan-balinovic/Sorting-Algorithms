import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[rectanglesContainer]'
})
export class RectanglesContainerDirective {

  constructor(public viewContainerRef:ViewContainerRef) { }

}
