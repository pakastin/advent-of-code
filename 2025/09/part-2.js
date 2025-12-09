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

const width = Math.max(...corners.map(({ x }) => x)) + 3;
const height = Math.max(...corners.map(({ y }) => y)) + 2;

const grid = new Array(height);

for (let y = 0; y < height; y++) {
  grid[y] = new Array(width);
  for (let x = 0; x < width; x++) {
    grid[y][x] = ".";
  }
}

for (const corner of corners) {
  const { x, y } = corner;
  grid[y][x] = "#";
}

for (let y = 0; y < height; y++) {
  const row = grid[y];
  const firstTile = row.indexOf("#");
  const lastTile = row.lastIndexOf("#");

  for (let x = firstTile; x < lastTile; x++) {
    if (row[x] !== "#") {
      row[x] = "X";
    }
  }
}

for (let x = 0; x < width; x++) {
  const col = grid.map((row) => row[x]);
  const firstTile = col.indexOf("#");
  const lastTile = col.lastIndexOf("#");

  for (let y = firstTile; y < lastTile; y++) {
    if (grid[y][x] !== "#") {
      grid[y][x] = "X";
    }
  }
}

for (let y = 0; y < height; y++) {
  const row = grid[y];
  const firstTile = row.indexOf("X");
  const lastTile = row.lastIndexOf("X");

  for (let x = firstTile; x < lastTile; x++) {
    if (row[x] !== "#") {
      row[x] = "X";
    }
  }
}

for (let x = 0; x < width; x++) {
  const col = grid.map((row) => row[x]);
  const firstTile = col.indexOf("X");
  const lastTile = col.lastIndexOf("X");

  for (let y = firstTile; y < lastTile; y++) {
    if (grid[y][x] !== "#") {
      grid[y][x] = "X";
    }
  }
}

const boxes = [];

for (let left = 0; left < corners.length - 1; left++) {
  for (let right = left + 1; right < corners.length; right++) {
    const leftCorner = corners[left];
    const rightCorner = corners[right];

    const minX = Math.min(rightCorner.x, leftCorner.x);
    const maxX = Math.max(rightCorner.x, leftCorner.x);
    const minY = Math.min(rightCorner.y, leftCorner.y);
    const maxY = Math.max(rightCorner.y, leftCorner.y);

    const box = {
      minX,
      minY,
      maxX,
      maxY,
    };
    box.area = (maxX - minX + 1) * (maxY - minY + 1);

    boxes.push(box);
  }
}

boxes.sort((a, b) => b.area - a.area);

const boxesInside = boxes.filter((box) => {
  const { minX, minY, maxX, maxY } = box;
  const topLeft = grid[minY][minX];
  const topRight = grid[minY][maxX];
  const bottomLeft = grid[maxY][minX];
  const bottomRight = grid[maxY][maxX];

  return (
    (topLeft === "#" || topLeft === "X") &&
    (topRight === "#" || topRight === "X") &&
    (bottomLeft === "#" || bottomLeft === "X") &&
    (bottomRight === "#" || bottomRight === "X")
  );
});

console.log(boxesInside[0].area);

// console.log(grid.map((row) => row.join("")).join("\n"));
