export function isArraySorted(nodes: Array<any>) {
  if (nodes.length == 1 || nodes.length == 0) {
    return true;
  }
  for (let i = 0; i < nodes.length - 1; ++i) {
    if (!nodes[i]) continue;
    if (nodes[i] > nodes[i + 1]) {
      return false;
    }
  }
  return true;
}
