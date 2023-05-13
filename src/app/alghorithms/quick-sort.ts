import { NodeSwapCallback } from '../types/node-swap-callback';
import { Strategy } from './strategy';
import { Node } from '../models/node';

export class QuickSort extends Strategy {
  public sort(
    nodes: Node[],
    nodeSwapCallback: (currentNodesState: any[]) => void
  ): Promise<any[]> {
    return new Promise(async (resolve) => {
      await this.quickSort(nodes, 0, nodes.length, nodeSwapCallback);
      await nodeSwapCallback(nodes);
      await this.finishedEffect(nodes, nodeSwapCallback);
      resolve(nodes);
    });
  }

  private _nodesRef: Node[] = [];

  private async quickSort(
    nodes: Node[],
    low: number,
    high: number,
    nodeSwapCallback: NodeSwapCallback
  ) {
    if (low < high) {
      let pi = await this.partition(nodes, low, high, nodeSwapCallback);
      await this.quickSort(nodes, low, pi - 1, nodeSwapCallback);
      await this.quickSort(nodes, pi + 1, high, nodeSwapCallback);
    }
  }
  private async partition(
    nodes: Node[],
    low: number,
    high: number,
    nodeSwapCallback: NodeSwapCallback
  ): Promise<number> {
    let pivot = nodes[high];
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
      if (nodes[j]?.value <= pivot?.value) {
        i++;
        let p = nodes[i];
        nodes[i] = nodes[j];
        nodes[j] = p;
        //this.swap(nodes[i], nodes[j]);
        nodes[i]?.highlightSwap();
        nodes[j]?.highlightSwap();
        await nodeSwapCallback(nodes);
      }
    }
    nodes[i + 1]?.highlightSwap();
    nodes[high]?.highlightSwap();
    await nodeSwapCallback(nodes);
    let p = nodes[i + 1];
    nodes[i + 1] = nodes[high];
    nodes[high] = p;
    return i + 1;
  }

  private swap(a: Node, b: Node) {
    let p = a;
    a = b;
    b = p;
  }
}
