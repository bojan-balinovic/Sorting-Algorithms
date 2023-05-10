import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Node } from 'src/app/models/node';
import { BubbleSort } from './alghorithms/bubble-sort';
import { QuickSort } from './alghorithms/quick-sort';
import { SortingAlghorithm } from './alghorithms/sorting-alghorithm';
import { ChartComponent } from './components/chart/chart.component';
import { SelectionSort } from './alghorithms/selection-sort';
import { Strategy } from './alghorithms/strategy';
import { Algorithm } from './models/algorithm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SortingAlghoritms';

  @ViewChild('chart') chartComponent!: ChartComponent;

  nodes: Array<Node> = new Array<Node>();

  sortingAlgorithm: SortingAlghorithm = new SortingAlghorithm();
  selectedAlgorithm?: Algorithm;
  speed: number = 1;

  algorithms: Algorithm[] = [
    {
      name: 'Bubble sort',
      strategy: new BubbleSort(),
    },
  ];

  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.selectedAlgorithm = this.algorithms[0];
    this.sortingAlgorithm.setTrategy(this.algorithms[0].strategy);
  }

  ngAfterViewInit() {
    this.generateRandomNodes();
  }

  generateRandomNodes() {
    this.chartComponent.clearAll();
    this.nodes = [];
    for (let i = 0; i < 100; i++) {
      let randomNumber = Math.random() * 500;
      this.nodes.push(new Node({ id: i, value: Math.floor(randomNumber) }));
    }
    this.chartComponent.initNodes(this.nodes);
  }
  onChangeAlgorithm() {
    this.sortingAlgorithm.setTrategy(
      this.selectedAlgorithm?.strategy as Strategy
    );
  }

  sort() {
    this.zone.runOutsideAngular(async () => {
      this.sortingAlgorithm
        .sort(this.nodes, async (nodes: any[]) => {
          this.chartComponent.updateNodes(nodes);
          await delay(this.speed);
        })
        .then((nodes) => {
          this.nodes = nodes;
          console.log(nodes);
        });

      console.log(this.nodes);
    });
  }
}

function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
