import { readFile, writeFile } from "node:fs/promises";

const data = await readFile("data.txt", "utf8");

const [rangesStr, ingredientsStr] = data.split("\n\n");

const ranges = [];
for (const range of rangesStr.split("\n")) {
  const [start, end] = range.split("-").map((str) => Number(str));

  ranges.push({ start, end });
}

ranges.sort((a, b) => {
  return a.start - b.start;
});

for (let i = 1; i < ranges.length; i++) {
  const prev = ranges[i - 1];
  const range = ranges[i];

  if (range.start <= prev.end + 1) {
    prev.end = Math.max(prev.end, range.end);

    ranges.splice(i--, 1);
  }
}

let fresh = 0;

for (const range of ranges) {
  const { start, end } = range;
  console.log(start, end);
  fresh += end - start + 1;
}

console.log(fresh);
