import { SortStrategy } from "./sort-strategy";

export class SortingAlghorithm {
    constructor() {

    }
    sortStrategy?: SortStrategy;

    setTrategy(strategy: SortStrategy) {
        this.sortStrategy = strategy;
    }

    async sort(nodes: any[], nodeSwapCallback: () => void) {
        if (!this.sortStrategy)
            throw new Error("Sort strategy not set.");

        await this.sortStrategy?.sort(nodes, nodeSwapCallback);
    }
}