import { Node } from '../models/node';

export type RenderNodesToken = (
  currentNodesState: Node[],
  customSpeed?: number
) => void;
