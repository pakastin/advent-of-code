import { readFile } from "node:fs/promises";

const data = await readFile("data.txt", "utf8");

const lines = data.trim().split("\n");

let currentOperation = {
  operation: "",
  numbers: [],
};
const operations = [currentOperation];

const width = Math.max(...lines.map((line) => line.length));

for (let x = 0; x < width; x++) {
  const operation = lines[lines.length - 1][x] || "";
  const numbers = lines.slice(0, -1).map((line) => line[x] || "");
  if (numbers.filter((str) => str.trim()).length === 0) {
    currentOperation = {
      operation: "",
      numbers: [],
    };
    operations.push(currentOperation);
    continue;
  }
  currentOperation.numbers.push(
    Number(
      numbers
        .filter((str) => str.trim())
        .map((str) => Number(str))
        .join(""),
    ),
  );
  if (operation.trim()) {
    currentOperation.operation = operation;
  }
}

let sum = 0;

for (const operation of operations) {
  const multiply = operation.operation === "*";
  sum += operation.numbers.reduce(
    (sum, num) => {
      return multiply ? sum * num : sum + num;
    },
    multiply ? 1 : 0,
  );
}

console.log(sum);
