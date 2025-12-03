import { readFile } from "node:fs/promises";

const data = await readFile("data.txt", "utf8");

let sum = 0;

for (const line of data.split("\n")) {
  const combinations = [];

  for (let first = 0; first < line.length - 1; first++) {
    for (let second = first + 1; second < line.length; second++) {
      combinations.push(line[first] + line[second]);
    }
  }
  combinations.sort();
  const largest = Number(combinations.slice(-1)[0]);
  if (largest) {
    sum += largest;
  }
}

console.log(sum);
