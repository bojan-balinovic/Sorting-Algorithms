import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Node } from 'src/app/models/node';
import { BubbleSort } from './alghorithms/bubble-sort';
import { QuickSort } from './alghorithms/quick-sort';
import { SortingAlghorithm } from './alghorithms/sorting-alghorithm';
import { ChartComponent } from './components/chart/chart.component';
import { SelectionSort } from './alghorithms/selection-sort';

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
  constructor(private zone: NgZone) {}
  ngOnInit() {
    this.sortingAlgorithm.setTrategy(new BubbleSort());
  }
  async ngAfterViewInit() {
    this.zone.runOutsideAngular(async () => {
      for (let i = 0; i < 50; i++) {
        let randomNumber = Math.random() * 500;
        this.nodes.push(new Node({ id: i, value: Math.floor(randomNumber) }));
      }
      await delay(100);
      this.chartComponent.initNodes(this.nodes);

      this.sortingAlgorithm
        .sort(this.nodes, async (nodes: any[]) => {
          //console.log(nodes)
           this.chartComponent.updateNodes(nodes);
          console.log('udpate ');
          await delay(100);
          //  new Promise((resolve) => {
          //   setTimeout(() => {
          //     requestAnimationFrame(() => {
          //       this.chartComponent.updateNodes(nodes);
          //       resolve(undefined);
          //     });
              
          //   }, 100);
          // });
        })
        .then((nodes) => {
          this.nodes = nodes;
          console.log(nodes);
        });

      console.log(this.nodes);
    });
  }
  bla() {}
}

function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
