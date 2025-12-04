import { readFile } from "node:fs/promises";
import { cloneGrid, printGrid } from "./grid.js";

const data = await readFile("data.txt", "utf8");
const lines = data.split("\n").filter((str) => str);

let grid = new Map();

let result = 0;

for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[y].length; x++) {
    const char = lines[y][x];
    grid.get(y) ?? grid.set(y, new Map());
    grid.get(y).set(x, char);
  }
}

let resultGrid;

while (true) {
  resultGrid = cloneGrid(grid);
  let changes = 0;

  const dirs = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (const y of grid.keys()) {
    const row = grid.get(y);
    for (const x of row.keys()) {
      const char = row.get(x);
      const neighbors = dirs
        .map(([dx, dy]) => {
          return grid.get(y + dy)?.get(x + dx);
        })
        .filter((_) => _);
      const rolls = neighbors.filter((char) => char === "@").length;
      if (char === "@" && rolls < 4) {
        resultGrid.get(y).set(x, "x");
        result++;
        changes++;
      }
    }
  }
  grid = resultGrid;
  if (changes === 0) {
    break;
  }
}

console.log(printGrid(resultGrid));
console.log(result);
