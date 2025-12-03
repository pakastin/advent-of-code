import { readFile } from "node:fs/promises";

const data = await readFile("data.txt", "utf8");

let sum = 0;

for (let line of data.split("\n").filter((str) => str)) {
  const bank = line.split("").map((str) => Number(str));
  for (let i = 0; i < bank.length - 1; i++) {
    const value = bank[i];
    const nextValue = bank[i + 1];

    if (bank.length > 12) {
      if (nextValue > value) {
        bank.splice(i, 1);
        i -= 2;
      }
    }
  }
  while (bank.length > 12) {
    bank.pop();
  }
  const value = Number(bank.join(""));
  sum += value;
}
console.log(sum);
