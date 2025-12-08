import { readFile } from "node:fs/promises";
import Node from "./node.js";

let id = 1;
const nodes = (await readFile("data.txt", "utf8"))
  .trim()
  .split("\n")
  .map((line) => {
    const [x, y, z] = line.split(",").map((str) => Number(str));
    return new Node({ id: id++, x, y, z });
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

const topLinks = links.slice(0, 1000);

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

  if (left.root) {
    if (right.root !== left.root) {
      if (right.root) {
        topNodes
          .filter((node) => node.root === right.root)
          .forEach((node) => {
            node.parent = left.root;
          });
      } else {
        right.parent = left.root;
      }
    }
  } else if (right.root) {
    if (left.root !== right.root) {
      if (left.root) {
        topNodes
          .filter((node) => node.root === left.root)
          .forEach((node) => {
            node.parent = right.root;
          });
      } else {
        left.parent = right.root;
      }
    }
  } else {
    right.parent = left;
  }
}

const rootLookup = {};

for (const node of nodes) {
  rootLookup[node.root.id] || (rootLookup[node.root.id] = []);
  rootLookup[node.root.id].push(node);
}

const circuits = Object.values(rootLookup);

circuits.sort((a, b) => {
  return b.length - a.length;
});

const topCircuits = circuits.slice(0, 3);

console.log(
  topCircuits.reduce((result, arr) => {
    return result * arr.length;
  }, 1),
);

function dist3d(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dz = b.z - a.z;

  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2));
}
