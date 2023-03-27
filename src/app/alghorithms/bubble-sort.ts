import { SortStrategy } from "./sort-strategy";

export class BubbleSort extends SortStrategy {
    sort(nodes: any[], nodeSwapCallback: () => void): Promise<any[]> {
        return new Promise(async (resolve) => {
            for (let x = 0; x < nodes.length; ++x) {
                for (let y = 0; y < nodes.length; ++y) {
                    if (nodes[x].value < nodes[y].value) {
                        let p = nodes[x].value;
                        nodes[x].value = nodes[y].value;
                        nodes[y].value = p;
                    }
                    await nodeSwapCallback();
                }
            }
            resolve(nodes);
        })
    }

}

