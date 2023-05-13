import { NodeSwapCallback } from '../types/node-swap-callback';
import { Node } from '../models/node';

export abstract class Strategy {
  abstract sort(
    nodes: any[],
    nodeSwapCallback: (currentNodesState: any[]) => void
  ): Promise<any[]>;

  async finishedEffect(nodes: Node[], nodeSwapCallback: NodeSwapCallback) {
    for await (let node of nodes) {
      node?.highlightSwap();
      await nodeSwapCallback(nodes, 1);
    }
  }
}
