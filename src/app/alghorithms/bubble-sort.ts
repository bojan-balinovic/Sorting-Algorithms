import { RenderNodesToken } from '../types/render-nodes-token';
import { Strategy } from './strategy';

export class BubbleSort extends Strategy {
  sort(nodes: any[], renderNodesToken: RenderNodesToken): Promise<any[]> {
    return new Promise(async (resolve) => {
      for (let x = 0; x < nodes.length; ++x) {
        for (let y = 0; y < nodes.length; ++y) {
          if (nodes[x].value < nodes[y].value) {
            nodes[x].highlightSwap();
            nodes[y].highlightSwap();
            let p = nodes[x].value;
            nodes[x].value = nodes[y].value;
            nodes[y].value = p;
          }
        }
        await renderNodesToken(nodes);
      }

      await this.finishedEffect(nodes, renderNodesToken);

      resolve(nodes);
    });
  }
}
