import { RenderNodesToken } from '../types/render-nodes-token';
import { Strategy } from './strategy';
import { Node } from '../models/node';

export class QuickSort extends Strategy {
  public sort(
    nodes: Node[],
    renderNodesToken: (currentNodesState: any[]) => void
  ): Promise<any[]> {
    return new Promise(async (resolve) => {
      await this.quickSort(nodes, 0, nodes.length, renderNodesToken);
      await renderNodesToken(nodes);
      await this.finishedEffect(nodes, renderNodesToken);
      resolve(nodes);
    });
  }

  private _nodesRef: Node[] = [];

  private async quickSort(
    nodes: Node[],
    low: number,
    high: number,
    renderNodesToken: RenderNodesToken
  ) {
    if (low < high) {
      let pi = await this.partition(nodes, low, high, renderNodesToken);
      await this.quickSort(nodes, low, pi - 1, renderNodesToken);
      await this.quickSort(nodes, pi + 1, high, renderNodesToken);
    }
  }
  private async partition(
    nodes: Node[],
    low: number,
    high: number,
    renderNodesToken: RenderNodesToken
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
        await renderNodesToken(nodes);
      }
    }
    nodes[i + 1]?.highlightSwap();
    nodes[high]?.highlightSwap();
    await renderNodesToken(nodes);
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
