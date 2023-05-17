import { RenderNodesToken } from '../types/render-nodes-token';
import { Strategy } from './strategy';
import { Node } from '../models/node';

export class InsertionSort extends Strategy {
  override sort(
    nodes: Node[],
    renderNodesToken: RenderNodesToken
  ): Promise<Node[]> {
    return new Promise(async (resolve) => {
      // here starts the algorithm
      for (let i = 0; i < nodes.length; ++i) {
        let key = nodes[i];
        let j: number = i - 1;

        while (j >= 0 && nodes[j].value > key.value) {
          //swap
          let p = nodes[j + 1];
          nodes[j + 1] = nodes[j];
          nodes[j] = p;

          j -= 1;
        }

        nodes[i].highlightSwap();
        if (j >= 0) nodes[j].highlightSwap();
        await renderNodesToken(nodes);
      }
      await this.finishedEffect(nodes, renderNodesToken);
      resolve(nodes);
    });
  }
}
