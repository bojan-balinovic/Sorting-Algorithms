import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Node } from 'src/app/models/node';

import * as d3 from 'd3';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @ViewChild('svgContainer') svgContainer!: ElementRef;
  svg: any;
  rects: any;
  private readonly svgHeight = 500;
  private readonly svgWidth = 500;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const svg = d3
      .select(this.svgContainer.nativeElement)
      .attr('width', this.svgWidth)
      .attr('height', this.svgHeight);
    this.svg = svg;
  }

  public updateRectsFromNodes() {
    this.rects
      .attr('height', (d: Node) => {
        return d.value;
      })
      .attr('y', (n: Node) => {
        return this.svgHeight - n.value;
      });
  }
  public drawRects(nodes: Node[]) {
    const rectWidth = 10;

    this.rects = this.svg
      .selectAll('rect')
      .data(nodes)
      .enter()
      .append('rect')
      .attr('x', (n: Node) => {
        return n.id * rectWidth;
      })
      .attr('y', (n: Node) => {
        return this.svgHeight - n.value;
      })
      .attr('width', rectWidth)
      .attr('height', (d: Node) => {
        return d.value;
      })
      .style('fill', 'blue')
      .style('stroke', 'black');
  }
}
