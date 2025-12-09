import { readFile } from "node:fs/promises";

const { TEST } = process.env;

const lines = (await readFile(TEST ? "test.txt" : "data.txt", "utf8"))
  .trim()
  .split("\n");

const corners = [];

for (const line of lines) {
  const [x, y] = line.split(",").map(Number);

  corners.push({ x, y });
}

const boxes = [];

for (let left = 0; left < corners.length - 1; left++) {
  for (let right = left + 1; right < corners.length; right++) {
    const leftCorner = corners[left];
    const rightCorner = corners[right];

    const box = {
      width: Math.abs(rightCorner.x - leftCorner.x) + 1,
      height: Math.abs(rightCorner.y - leftCorner.y) + 1,
    };
    box.left = leftCorner;
    box.right = rightCorner;
    box.area = box.width * box.height;

    boxes.push(box);
  }
}

boxes.sort((a, b) => b.area - a.area);

console.log(boxes[0]);
