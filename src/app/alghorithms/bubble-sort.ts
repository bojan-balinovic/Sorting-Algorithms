import { Subject } from 'rxjs';
import { RenderNodesToken } from '../types/render-nodes-token';
import { Strategy } from './strategy';
import { Node } from '../models/node';

export class BubbleSort extends Strategy {
  sort(
    nodes: Node[],
    renderNodesToken: RenderNodesToken,
    stopExecutionSubject?: Subject<boolean>
  ): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      let running = true;
      stopExecutionSubject?.subscribe(() => {
        running = false;
        reject('Stop execution');
      });

      // here starts the algorithm
      for (let x = 0; x < nodes.length && running; ++x) {
        for (let y = 0; y < nodes.length - x - 1 && running; ++y) {
          if (nodes[y].value > nodes[y + 1].value) {
            nodes[y].highlight();
            nodes[y + 1].highlight();

            // swap
            let p = nodes[y].value;
            nodes[y].value = nodes[y + 1].value;
            nodes[y + 1].value = p;
          }
        }
        await renderNodesToken(nodes);
      }

      await this.finishedEffect(nodes, renderNodesToken);

      resolve(nodes);
    });
  }
}
