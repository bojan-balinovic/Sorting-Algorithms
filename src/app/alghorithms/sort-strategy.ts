export abstract class SortStrategy {
    abstract sort(nodes: any[], nodeSwapCallback: (currentNodesState:any[]) => void): Promise<any[]>;
}
