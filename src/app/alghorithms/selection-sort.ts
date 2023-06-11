import { Subject } from 'rxjs';
import { RenderNodesToken } from '../types/render-nodes-token';
import { Strategy } from './strategy';
import { Node } from '../models/node';

export class SelectionSort extends Strategy {
  constructor() {
    super();
    this.running = true;
  }

  sort(
    nodes: Node[],
    renderNodesToken: RenderNodesToken,
    stopExecutionSubject?: Subject<boolean>
  ): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      stopExecutionSubject?.subscribe(async () => {
        this.running = false;
        await renderNodesToken(nodes);
        reject('Stop execution');
      });

      // here starts the algorithm
      for (let i = 0; i < nodes.length - 1 && this.running; i++) {
        let min = i;
        nodes[i].highlight();
        for (let j = i + 1; j < nodes.length && this.running; j++) {
          if (nodes[min].value > nodes[j].value) {
            nodes[min].highlight();
            nodes[j].highlight();
            min = j;
          }
        }
        let temp = nodes[i];
        nodes[i] = nodes[min];
        nodes[min] = temp;
        await renderNodesToken(nodes);
      }
      await this.finishedEffect(nodes, renderNodesToken);
      resolve(nodes);
    });
  }
}
