import { Strategy } from './strategy';

export class QuickSort extends Strategy {
  public sort(
    nodes: any[],
    nodeSwapCallback: (currentNodesState: any[]) => void
  ): Promise<any[]> {
    console.log('quick sort alg');
    return new Promise((resolve) => {
      resolve(this.quickSort(nodes, nodeSwapCallback));
    });
  }

  private _nodesRef: Node[] = [];

  private quickSort(
    nodes: any[],
    nodeSwapCallback: (currentNodesState: any[]) => void
  ): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      console.log('inside promise')
      if (nodes.length <= 1) {
        resolve(nodes);
        return;
      }

      let pivot = nodes[0];

      let left = [];
      let right = [];

      for (var i = 1; i < nodes.length; i++) {
        nodes[i].value < pivot.value
          ? left.push(nodes[i])
          : right.push(nodes[i]);

      }
      //await nodeSwapCallback(left.concat(pivot,right));
      Promise.all([
        this.quickSort(left, nodeSwapCallback),
        this.quickSort(right, nodeSwapCallback),
      ])
        .then((values) => {
          resolve(values[0].concat(pivot, values[1]));
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
