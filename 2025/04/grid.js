export function cloneGrid(grid) {
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

export function printGrid(grid) {
  let results = "";

  for (const y of grid.keys()) {
    for (const x of grid.get(y).keys()) {
      results += grid.get(y).get(x);
    }
    results += "\n";
  }

  return results;
}
