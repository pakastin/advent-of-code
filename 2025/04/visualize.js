const textarea = document.querySelector("textarea");
const button = document.querySelector("button");
const pre = document.querySelector("pre");

button.addEventListener("click", async () => {
  const lines = textarea.value.split("\n").filter((_) => _);
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
    pre.textContent = printGrid(resultGrid);
    grid = resultGrid;
    if (changes === 0) {
      break;
    }
    await new Promise((response) => setTimeout(response, 500));
  }
});

function cloneGrid(grid) {
  const result = new Map();

  for (const y of grid.keys()) {
    const row = grid.get(y);
    result.set(y, new Map());
    for (const x of row.keys()) {
      result.get(y).set(x, row.get(x));
    }
  }

  return result;
}

function printGrid(grid) {
  let results = "";

  for (const y of grid.keys()) {
    for (const x of grid.get(y).keys()) {
      results += grid.get(y).get(x);
    }
    results += "\n";
  }

  return results;
}
