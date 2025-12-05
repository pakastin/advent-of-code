import { readFile } from "node:fs/promises";

const data = await readFile("data.txt", "utf8");

const [rangesStr, ingredientsStr] = data.split("\n\n");

const ranges = [];

for (const range of rangesStr.split("\n")) {
  const [start, end] = range.split("-").map((str) => Number(str));

  ranges.push({ start, end });
}

let fresh = 0;

for (const ingredient of ingredientsStr.split("\n")) {
  for (const range of ranges) {
    if (ingredient < range.start) {
      continue;
    }
    if (ingredient > range.end) {
      continue;
    }
    fresh++;
    break;
  }
}

console.log(fresh);
