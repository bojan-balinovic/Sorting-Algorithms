export abstract class SortStrategy {
    abstract sort(nodes: any[], nodeSwapSignal: () => void): Promise<any[]>;
}