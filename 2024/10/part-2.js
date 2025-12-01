const data = (await Deno.readTextFile("data.txt")).split("\n");

const grid = {};
const startPoints = [];

for (let y = 0; y < data.length; y++) {
  for (let x = 0; x < data[y].length; x++) {
    const height = Number(data[y][x]);
    const cell = {
      x,
      y,
      height: height,
      neighbors: [],
    };

    grid[y] || (grid[y] = {});
    grid[y][x] = cell;

    if (height === 0) {
      startPoints.push(cell);
    }
  }
}

for (let y = 0; y < data.length; y++) {
  for (let x = 0; x < data[y].length; x++) {
    grid[y][x].neighbors = [
      grid[y][x - 1],
      grid[y - 1]?.[x],
      grid[y][x + 1],
      grid[y + 1]?.[x],
    ].filter((cell) => cell);
  }
}

let sum = 0;

for (const startPoint of startPoints) {
  const results = findTrails(startPoint, grid);
  sum += results.length;
}

console.log(sum);

function findTrails(cell, grid, results = []) {
  const { x, y, height, neighbors } = cell;

  if (height === 9) {
    results.push(cell);
  }

  const uptrails = neighbors.filter((cell) => cell.height - height === 1);

  for (const uptrail of uptrails) {
    findTrails(uptrail, grid, results);
  }

  return results;
}
