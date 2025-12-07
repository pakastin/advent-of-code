import { readFile } from "node:fs/promises";

const lines = (await readFile("data.txt", "utf8"))
  .trim()
  .split("\n")
  .map((line) => line.split(""));

let splits = 0;

let beams = new Array(lines[0].length).fill(0);

for (let y = 0; y < lines.length; y++) {
  const line = lines[y];
  const prevLine = lines[y - 1];

  for (let x = 0; x < line.length; x++) {
    const char = line[x];
    const prevChar = prevLine?.[x];

    if (char === "S") {
      line[x] = "|";
      beams[x] = 1;
    } else if (prevChar === "|") {
      if (char === "^") {
        line[x - 1] = "|";
        line[x + 1] = "|";
        beams[x - 1] += beams[x] || 0;
        beams[x + 1] += beams[x] || 0;
        beams[x] = 0;
      } else {
        line[x] = "|";
      }
    }
  }
}

console.log(
  beams.reduce((sum, beams) => {
    return sum + beams;
  }, 0),
);
