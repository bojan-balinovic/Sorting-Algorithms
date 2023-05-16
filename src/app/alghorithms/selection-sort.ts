import { RenderNodesToken } from '../types/render-nodes-token';
import { Strategy } from './strategy';

export class SelectionSort extends Strategy {
  override sort(
    nodes: any[],
    renderNodesToken: RenderNodesToken
  ): Promise<any[]> {
    return new Promise(async (resolve) => {
      // here starts the algorithm
      for (let i = 0; i < nodes.length - 1; i++) {
        let min = i;
        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[min].value > nodes[j].value) {
            nodes[min].highlightSwap();
            nodes[j].highlightSwap();
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
