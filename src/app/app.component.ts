import { Component, OnInit, ViewChild } from '@angular/core';
import { Node } from 'src/app/models/node';
import { ChartComponent } from './components/chart/chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SortingAlghoritms';

  @ViewChild('rectanglesDrawer') rectanglesDrawer!: ChartComponent;

  nodes: Array<Node> = new Array<Node>();

  ngOnInit() {}
  async ngAfterViewInit() {
    for (let i = 0; i < 50; i++) {
      let randomNumber = Math.random() * 500;
      this.nodes.push(new Node({ id: i, value: randomNumber }));
    }
    this.rectanglesDrawer.drawRects(this.nodes);

    for (let x = 0; x < this.nodes.length; ++x) {
      for (let y = 0; y < this.nodes.length; ++y) {
        if (this.nodes[x].value < this.nodes[y].value) {
          let p = this.nodes[x].value;
          this.nodes[x].value = this.nodes[y].value;
          this.nodes[y].value = p;
        }

        this.rectanglesDrawer.updateRectsFromNodes();
        await delay(1);
      }
    }
  }
}

function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
