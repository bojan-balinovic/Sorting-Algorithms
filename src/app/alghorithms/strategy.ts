import { RenderNodesToken } from '../types/render-nodes-token';
import { Node } from '../models/node';
import { Subject } from 'rxjs';

export abstract class Strategy {
  public running = true;

  abstract sort(
    nodes: any[],
    renderNodesToken: (currentNodesState: any[]) => void,
    stopExecutionSubject?: Subject<boolean>
  ): Promise<any[]>;

  async finishedEffect(nodes: Node[], renderNodesToken: RenderNodesToken) {
    for await (let node of nodes) {
      node?.highlight();
      await renderNodesToken(nodes, 1);
    }
  }
}
