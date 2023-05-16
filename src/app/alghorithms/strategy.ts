import { RenderNodesToken } from '../types/render-nodes-token';
import { Node } from '../models/node';

export abstract class Strategy {
  abstract sort(
    nodes: any[],
    renderNodesToken: (currentNodesState: any[]) => void
  ): Promise<any[]>;

  async finishedEffect(nodes: Node[], renderNodesToken: RenderNodesToken) {
    for await (let node of nodes) {
      node?.highlightSwap();
      await renderNodesToken(nodes, 1);
    }
  }
}
