import { RenderNodesToken } from '../types/render-nodes-token';
import { Strategy } from './strategy';
import { Node } from '../models/node';
import { Subject } from 'rxjs';

export class InsertionSort extends Strategy {
  override sort(
    nodes: Node[],
    renderNodesToken: RenderNodesToken,
    stopExecutionSubject: Subject<boolean>
  ): Promise<Node[]> {
    return new Promise(async (resolve, reject) => {
      stopExecutionSubject?.subscribe(() => {
        this.running = false;
        reject('Stop execution');
      });

      // here starts the algorithm
      for (let i = 0; i < nodes.length; ++i && this.running) {
        let key = nodes[i];
        let j: number = i - 1;

        while (j >= 0 && nodes[j].value > key.value && this.running) {
          //swap
          let p = nodes[j + 1];
          nodes[j + 1] = nodes[j];
          nodes[j] = p;

          j -= 1;
        }

        nodes[i].highlight();
        if (j >= 0) nodes[j].highlight();
        await renderNodesToken(nodes);
      }
      await this.finishedEffect(nodes, renderNodesToken);
      resolve(nodes);
    });
  }
}
