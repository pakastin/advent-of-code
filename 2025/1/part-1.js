import { readFile } from "node:fs/promises";

const data = await readFile("data.txt", "utf-8");

let value = 50;
let zeros = 0;

for (const line of data.split("\n").filter((str) => str)) {
  const dir = line[0];
  const num = Number(line.slice(1));
  if (dir === "R") {
    value = (value + num) % 100;
  } else if (dir === "L") {
    value = (value - num) % 100;
  }
  if (value === 0) {
    zeros++;
  }
}
console.log(zeros);
