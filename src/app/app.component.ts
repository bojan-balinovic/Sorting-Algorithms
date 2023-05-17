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
import { shuffleArray } from './utils/shuffle-array';
import { InsertionSort } from './alghorithms/insertion-sort';

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
    {
      name: 'Insertion sort',
      strategy: new InsertionSort(),
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
      this.nodes.push(new Node(i, i * 5));
    }
    this.nodes = shuffleArray(this.nodes);
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

    let prom = this.sortingAlgorithm
      .sort(
        this.nodes,
        // node swap event
        async (nodes: any[], customSpeed = undefined) => {
          if (this.isSorting == false) return;
          await delay(customSpeed || (1 - this.speed / 100) * 100);
          this.chartComponent.updateNodes(nodes);
        }
      )
      .then((nodes) => {
        // finished sorting
        this.nodes = nodes;
        this.isSorting = false;
        this.chartComponent.updateNodes(nodes);
      });
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
