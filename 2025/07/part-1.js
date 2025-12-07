import { readFile } from "node:fs/promises";

const lines = (await readFile("data.txt", "utf8"))
  .trim()
  .split("\n")
  .map((line) => line.split(""));

let splits = 0;
for (let y = 0; y < lines.length; y++) {
  const line = lines[y];
  const prevLine = lines[y - 1];
  for (let x = 0; x < line.length; x++) {
    const char = line[x];
    const prevChar = prevLine?.[x];

    if (prevChar === "S" || prevChar === "|") {
      if (char === "^") {
        splits++;
        line[x - 1] = "|";
        line[x + 1] = "|";
      } else {
        line[x] = "|";
      }
    }
  }
}

console.log(splits);
