import { SortStrategy } from './sort-strategy';

export class QuickSort extends SortStrategy {
  public sort(nodes: any[], nodeSwapCallback: () => void): Promise<any[]> {
    return new Promise(async (resolve) => {
      if (nodes.length <= 1) {
        resolve(nodes);
      }

      const pivot = nodes[nodes.length-1];
      const left = [];
      const equal = [];
      const right = [];
      
      for (const element of nodes) {
        if (element < pivot) {
          left.push(element);
        } else if (element === pivot) {
          equal.push(element);
        } else {
          right.push(element);
        }
        //await nodeSwapCallback();
      }

      resolve(
        (await this.sort(left, nodeSwapCallback)).concat(
          equal,
          await this.sort(right, nodeSwapCallback)
        )
      );
    });
  }
}
