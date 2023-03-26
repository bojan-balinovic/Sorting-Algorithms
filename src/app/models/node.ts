export class Node {
  id: number = 0;
  value: number = 0;
  constructor(props: Node) {
    if (props) {
      Object.assign(this, props);
    }
  }
}
