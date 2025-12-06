import { readFile } from "node:fs/promises";

const data = await readFile("data.txt", "utf8");

const lines = data
  .trim()
  .split("\n")
  .map((line) => line.trim().split(/\s+/));

const operations = [];

for (let y = 0; y < lines.length; y++) {
  const line = lines[y];
  for (let x = 0; x < line.length; x++) {
    operations[x] || (operations[x] = []);
    operations[x].push(line[x]);
  }
}

let sum = 0;

for (const operation of operations) {
  const numbers = operation.slice(0, -1).map((str) => Number(str));
  const multiply = operation[operation.length - 1] === "*";

  sum += numbers.reduce(
    (sum, num) => {
      return multiply ? sum * num : sum + num;
    },
    multiply ? 1 : 0,
  );
}

console.log(sum);
