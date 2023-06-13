import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Node } from 'src/app/models/node';

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
  nodeHighlightedColor: string = '#009e52';
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
    if (!nodes || nodes.length == 0) return;

    this.clearnGraphicsObjects();
    nodes.forEach((node: Node, i) => {
      if (node == undefined) {
        return;
      }
      this.drawRectangle(
        i * 10 + this.offsetX,
        0,
        10,
        node.value,
        node.shouldHighlightInNextFrame ? this.nodeHighlightedColor : undefined
      );
      node.shouldHighlightInNextFrame = false;
    });
  }

  private drawNodes() {}

  private drawRectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    fillColor = '#f5abaa'
  ) {
    this.drawingContext.beginPath();
    y = 500 - height + this.offsetY;
    this.addGraphicsObjectsReference({
      x: x,
      y: y,
      width: width,
      height: height,
    });
    this.drawingContext.fillStyle = fillColor;
    this.drawingContext.strokeStyle = '#000';
    this.drawingContext.rect(x, y, width, height);
    this.drawingContext.fill();
    this.drawingContext.stroke();
  }
  addGraphicsObjectsReference(obj: GraphicsObject) {
    this.graphicsObjects.push(obj);
  }
  clearnGraphicsObjects() {
    // Clear everything from the canvas
    this.drawingContext.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
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
