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

const polygon = [];

for (let left = 0; left < corners.length - 1; left++) {
  for (let right = left + 1; right < corners.length; right++) {
    const a = corners[left];
    const b = corners[right];

    if (a.x === b.x) {
      polygon.push(a);
      polygon.push(b);
    } else if (a.y === b.y) {
      polygon.push(a);
      polygon.push(b);
    }
  }
}

let lookup = {};

const cleanedPolygon = polygon.filter(({ x, y }) => {
  if (lookup[y]?.[x]) {
    return false;
  }
  lookup[y] || (lookup[y] = {});
  lookup[y][x] = true;
  return true;
});

const geojson = {
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      cleanedPolygon.map(({ x, y }) => {
        return [x, y];
      }),
    ],
  },
};

console.log(geojson);
