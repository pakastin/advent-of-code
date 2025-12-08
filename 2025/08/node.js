export default class Node {
  constructor({ id, x, y, z }) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.z = z;
  }
  get ancestors() {
    let traverse = this;
    const results = [];

    while (traverse) {
      results.push(traverse);

      traverse = traverse.parent;
    }

    return results;
  }
  get root() {
    if (this.ancestors?.length) {
      return this.ancestors[this.ancestors.length - 1];
    }
  }
}
