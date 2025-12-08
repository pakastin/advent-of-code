import { readFile } from "node:fs/promises";

const TEST = process.env.TEST;

let id = 1;
const nodes = (await readFile(TEST ? "test.txt" : "data.txt", "utf8"))
  .trim()
  .split("\n")
  .map((line) => {
    const [x, y, z] = line.split(",").map((str) => Number(str));
    return { id: id++, x, y, z };
  });

const links = [];

for (let left = 0; left < nodes.length - 1; left++) {
  const leftNode = nodes[left];
  for (let right = left + 1; right < nodes.length; right++) {
    const rightNode = nodes[right];

    links.push({
      a: leftNode,
      b: rightNode,
      d: dist3d(leftNode, rightNode),
    });
  }
}

links.sort((a, b) => {
  return a.d - b.d;
});

const nodeLookup = {};

const topLinks = links.slice(0, TEST ? 10 : 1000);

for (const link of topLinks) {
  const left = link.a;
  const right = link.b;

  nodeLookup[left.id] = left;
  nodeLookup[right.id] = right;
}

const topNodes = Object.values(nodeLookup);

for (const link of topLinks) {
  const left = link.a;
  const right = link.b;

  connect(left, right);
}

const unconnectedLinks = links.slice(TEST ? 10 : 1000);

let circuits = getCircuits(nodes);

const connections = [];

let lastLink;

while (unconnectedLinks.length) {
  const link = unconnectedLinks.shift();
  connect(link.a, link.b);
  circuits = getCircuits(nodes);
  if (Object.keys(circuits).length === 1) {
    console.log(link.a.x * link.b.x);
    process.exit();
  }
}

function dist3d(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dz = b.z - a.z;

  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2));
}

function find(node) {
  if (!node.parent) {
    return node;
  }
  node.parent = find(node.parent);
  return node.parent;
}

function connect(a, b) {
  const rootA = find(a);
  const rootB = find(b);

  if (rootA !== rootB) {
    rootB.parent = rootA;
  }
}

function getCircuits(nodes) {
  return nodes.reduce((lookup, node) => {
    const rootId = find(node).id;
    lookup[rootId] || (lookup[rootId] = []);
    lookup[rootId].push(node);
    return lookup;
  }, {});
}
