import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Node } from 'src/app/models/node';
import { BubbleSort } from './alghorithms/bubble-sort';
import { QuickSort } from './alghorithms/quick-sort';
import { SortingAlghorithm } from './alghorithms/sorting-alghorithm';
import { ChartComponent } from './components/chart/chart.component';
import { SelectionSort } from './alghorithms/selection-sort';
import { Strategy } from './alghorithms/strategy';
import { Algorithm } from './models/algorithm';
import { isArraySorted } from './utils/is-array-sorted';

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
  speed: number = 50;

  algorithms: Algorithm[] = [
    {
      name: 'Bubble sort',
      strategy: new BubbleSort(),
    },
    {
      name: 'Quick sort',
      strategy: new QuickSort(),
    },
    {
      name: 'Selection sort',
      strategy: new SelectionSort(),
    },
  ];
  isSorting: boolean = false;

  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.selectedAlgorithm = this.algorithms[0];
    this.sortingAlgorithm.setTrategy(this.algorithms[0].strategy);
  }

  ngAfterViewInit() {
    this.generateRandomNodes();
  }

  generateRandomNodes() {
    if (this.isSorting) return;
    this.nodes = [];
    this.chartComponent.clearAll();
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
    if (this.isSorting) return;
    if (isArraySorted(this.nodes.map((n) => n.value))) return;

    this.isSorting = true;
    // this.zone.runOutsideAngular(async () => {
      let prom = this.sortingAlgorithm
        .sort(
          this.nodes,
          // callback when node swap happen
          async (nodes: any[]) => {
            if (this.isSorting == false) return;
            await delay(100 / this.speed);
            this.chartComponent.updateNodes(nodes);
          }
        )
        .then((nodes) => {
          //when finished
          this.nodes = nodes;
          this.isSorting = false;
          console.log(this.isSorting)
        });
    // });
  }
  cancelSorting() {
    this.isSorting = false;
  }
}

function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
