import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.scss'],
})
export class RectangleComponent implements OnInit {
  @ViewChild('svgContainer') svgContainer!: ElementRef;

  constructor() {}
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    const width = 30;
    const height = 500;

    const svg = d3
      .select(this.svgContainer.nativeElement)
      .attr('width', width)
      .attr('height', height);

    const rectWidth = 30;
    const rectHeight = 500
    ;
    const rectX = (width - rectWidth) / 2;
    const rectY = (height - rectHeight) / 2;

    svg
      .append('rect')
      .attr('x', rectX)
      .attr('y', rectY)
      .attr('width', rectWidth)
      .attr('height', rectHeight)
      .style('fill', 'blue')
      .style('stroke', 'black');
  }
}
