export abstract class SortStrategy {
    abstract sort(nodes: any[], nodeSwapCallback: () => void): Promise<any[]>;
}