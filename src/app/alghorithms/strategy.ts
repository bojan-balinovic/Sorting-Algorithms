export abstract class Strategy {
    abstract sort(nodes: any[], nodeSwapCallback: (currentNodesState:any[]) => void): Promise<any[]>;
}
