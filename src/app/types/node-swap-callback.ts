import { Node } from '../models/node';

export type NodeSwapCallback = (
  currentNodesState: Node[],
  customSpeed?: number
) => void;
