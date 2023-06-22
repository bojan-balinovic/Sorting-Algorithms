import { Subject } from 'rxjs';
import { RenderNodesToken } from '../types/render-nodes-token';
import { Strategy } from './strategy';
import { Node } from '../models/node';

export class MergeSort extends Strategy {
  constructor() {
    super();
    this.running = true;
  }
  renderNodesToken!: RenderNodesToken;
  globalNodes!: Node[];

  sort(
    nodes: Node[],
    renderNodesToken: RenderNodesToken,
    stopExecutionSubject?: Subject<boolean>
  ): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      this.renderNodesToken = renderNodesToken;
      this.globalNodes = nodes;
      stopExecutionSubject?.subscribe(async () => {
        this.running = false;
        await renderNodesToken(nodes);
        reject('Stop execution');
      });

      nodes = await this.mergeSort(nodes);
      await this.finishedEffect(nodes, renderNodesToken);
      resolve(nodes);
    });
  }
  async mergeSort(nodes: Node[]): Promise<Node[]> {
    return new Promise(async (resolve) => {
      if (nodes.length < 2) {
        resolve(nodes);
        return;
      }
      const mid = Math.floor(nodes.length / 2);
      nodes[mid].highlight();
      const leftArray = nodes.slice(0, mid);
      const rightArray = nodes.slice(mid);
      resolve(
        await this.merge(
          await this.mergeSort(leftArray),
          await this.mergeSort(rightArray)
        )
      );
    });
  }
  merge(left: Node[], right: Node[]): Promise<Node[]> {
    return new Promise(async (resolve) => {
      this.globalNodes = this.globalNodes.filter(
        (node) => !left.includes(node)
      );
      this.globalNodes = this.globalNodes.filter(
        (node) => !right.includes(node)
      );

      const sortedArr: Node[] = [];
      while (left.length && right.length) {
        if (left[0].value <= right[0].value) {
          left[0].highlight();
          sortedArr.push(left.shift() as Node);
        } else {
          right[0].highlight();
          sortedArr.push(right.shift() as Node);
        }
      }

      this.globalNodes.splice(sortedArr[0].id, 0, ...sortedArr);
      await this.renderNodesToken(this.globalNodes);
      resolve(sortedArr.concat(left).concat(right));
    });
  }
}
