import { Component, OnInit, ViewChild } from '@angular/core';
import { RectangleComponent } from './components/rectangle/rectangle.component';
import { RectanglesContainerDirective } from './directives/rectangles-container.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SortingAlghoritms';
  @ViewChild(RectanglesContainerDirective,{static:true}) rectanglesContainer!:RectanglesContainerDirective;

  ngOnInit(){
    this.loadRectangles();
  }
  ngAfterViewInit(){

  }
  loadRectangles(){
    this.rectanglesContainer.viewContainerRef.clear();
    for(let i=0;i<10;i++){
      this.rectanglesContainer.viewContainerRef.createComponent(RectangleComponent);
    }
  }
}
