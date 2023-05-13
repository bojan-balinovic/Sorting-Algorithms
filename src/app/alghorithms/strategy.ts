import { NodeSwapCallback } from '../types/node-swap-callback';
import { Node } from '../models/node';

export abstract class Strategy {
  abstract sort(
    nodes: any[],
    nodeSwapCallback: (currentNodesState: any[]) => void
  ): Promise<any[]>;
  async finishedEffect(nodes: Node[], nodeSwapCallback: NodeSwapCallback) {

   // return new Promise(async (resolve) => {
      console.log('start finish effect')
      for await (let node of nodes) {
        node.highlightSwap();
        await nodeSwapCallback(nodes, 1);
      }
      console.log('end effect')
      //resolve(undefined);
  //  });
  }
}
