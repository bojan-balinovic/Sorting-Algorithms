import { RenderNodesToken } from '../types/render-nodes-token';
import { Strategy } from './strategy';

export class SortingAlghorithm {
  constructor() {}
  sortStrategy?: Strategy;

  setTrategy(strategy: Strategy) {
    this.sortStrategy = strategy;
  }

  async sort(nodes: any[], renderNodesToken: RenderNodesToken): Promise<any[]> {
    if (!this.sortStrategy) throw new Error('Sort strategy not set.');

    return await this.sortStrategy?.sort(nodes, renderNodesToken);
  }
}
