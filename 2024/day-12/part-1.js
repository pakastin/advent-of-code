const grid = (await Deno.readTextFile("data.txt")).split("\n").map((line, y) =>
  line.split("").map((plant, x) => ({
    x,
    y,
    id: null,
    plant,
    neighbors: [],
  }))
);

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    const cell = grid[y][x];
    const neighbors = [
      grid[y][x - 1],
      grid[y - 1]?.[x],
      grid[y][x + 1],
      grid[y + 1]?.[x],
    ];
    cell.neighbors = neighbors
      .filter((cell) => cell)
      .filter((cell) => cell.plant === grid[y][x].plant);
    cell.fences = neighbors.filter(
      (cell) => cell?.plant !== grid[y][x].plant
    ).length;
  }
}

let id = 0;
const idLookup = [];

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    const cell = grid[y][x];
    if (cell.id == null) {
      walk(grid, cell, id++, idLookup);
    }
  }
}

let sum = 0;

for (const id in idLookup) {
  const cells = idLookup[id];

  sum += cells.length * cells.reduce((fences, cell) => fences + cell.fences, 0);
}

console.log(sum);

function walk(grid, cell, id, idLookup) {
  cell.id = id;
  idLookup[id] || (idLookup[id] = []);
  idLookup[id].push(cell);

  for (const neighbor of cell.neighbors) {
    if (neighbor.id == null) {
      walk(grid, neighbor, id, idLookup);
    }
  }
}
