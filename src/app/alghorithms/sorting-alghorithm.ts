import { Strategy } from './strategy';

export class SortingAlghorithm {
  constructor() {}
  sortStrategy?: Strategy;

  setTrategy(strategy: Strategy) {
    this.sortStrategy = strategy;
  }

  async sort(nodes: any[], nodeSwapCallback: (currentNodesState:any[]) => void): Promise<any[]> {
    if (!this.sortStrategy) throw new Error('Sort strategy not set.');

    return await this.sortStrategy?.sort(nodes, nodeSwapCallback);
  }
}
