import { Component, OnInit, ViewChild } from '@angular/core';
import { Node } from 'src/app/models/node';
import { BubbleSort } from './alghorithms/bubble-sort';
import { QuickSort } from './alghorithms/quick-sort';
import { SortingAlghorithm } from './alghorithms/sorting-alghorithm';
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

  sortingAlgorithm: SortingAlghorithm = new SortingAlghorithm();
  ngOnInit() {
    this.sortingAlgorithm.setTrategy(new QuickSort());
  }
  async ngAfterViewInit() {
    for (let i = 0; i < 50; i++) {
      let randomNumber = Math.random() * 500;
      this.nodes.push(new Node({ id: i, value: randomNumber }));
    }
    this.rectanglesDrawer.drawRects(this.nodes);

    // this.sortingAlgorithm.sort(this.nodes, async () => {
    //   this.rectanglesDrawer.updateRectsFromNodes();
    //   await delay(1);
    // })
  }
}

function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
