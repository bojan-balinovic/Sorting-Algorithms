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

  offsetX = 0;
  offsetY = 0;
  graphicsObjects: any[] = [];
  private drawingContext!: CanvasRenderingContext2D;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.drawingContext = this.canvas.nativeElement.getContext(
      '2d'
    ) as CanvasRenderingContext2D;
    this.canvas.nativeElement.width = 1000;
    this.canvas.nativeElement.height = 500;
    window.addEventListener('resize', () => {});
  }

  public initNodes(nodes: Node[]) {
    this.clearnGraphicsObjects();
    this.drawingContext.moveTo(0, 0);
    nodes.forEach((node, i) => {
      this.drawRectangle(i * 10 + this.offsetX, 0, 10, node.value);
    });
  }

  public updateNodes(nodes: Node[]) {
    this.clearnGraphicsObjects();
    nodes.forEach((node, i) => {
      this.drawRectangle(i * 10 + this.offsetX, 0, 10, node.value);
    });
  }

  private drawNodes() {}

  private drawRectangle(x: number, y: number, width: number, height: number) {
    this.drawingContext.beginPath();
    y = 500 - height + this.offsetY;
    this.addGraphicsObjectsReference({
      x: x,
      y: y,
      width: width,
      height: height,
    });
    this.drawingContext.fillRect(x, y, width, height);
    this.drawingContext.stroke();
  }
  addGraphicsObjectsReference(obj: GraphicsObject) {
    this.graphicsObjects.push(obj);
  }
  clearnGraphicsObjects() {
    this.graphicsObjects.forEach((b: any) => {
      this.drawingContext.clearRect(b.x, b.y, b.width, b.height);
    });
    this.graphicsObjects = [];
  }
  clearAll() {
    this.drawingContext.moveTo(0, 0);
    this.clearnGraphicsObjects();
    this.drawingContext.fillRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );

    // Clear everything from the canvas
    this.drawingContext.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
  }
}
interface GraphicsObject {
  x: number;
  y: number;
  width: number;
  height: number;
}
