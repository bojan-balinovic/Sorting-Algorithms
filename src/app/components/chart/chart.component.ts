import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Node } from 'src/app/models/node';

import * as d3 from 'd3';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  offsetX = 500;
  offsetY = 250;

  private drawingContext!: CanvasRenderingContext2D;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.drawingContext = this.canvas.nativeElement.getContext(
      '2d'
    ) as CanvasRenderingContext2D;
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
  }

  public initNodes(nodes: Node[]) {
    nodes.forEach((node, i) => {
      this.drawRectangle(i * 10 + this.offsetX, 0, 10, node.value);
    });
  }

  public updateNodes(nodes: Node[]) {}

  private drawNodes() {}

  private drawRectangle(x: number, y: number, width: number, height: number) {
    this.drawingContext.beginPath();
    y = 500 - height + this.offsetY;
    this.drawingContext.fillRect(x, y, width, height);
    this.drawingContext.stroke();
  }
}
