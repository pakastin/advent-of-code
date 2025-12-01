import { readFile } from "node:fs/promises";

const data = await readFile("data.txt", "utf-8");

let value = 50;
let password = 0;

for (const line of data.split("\n").filter((str) => str)) {
  const dir = line[0];
  const num = Number(line.slice(1));
  for (let i = 0; i < num; i++) {
    if (dir === "R") {
      value = (value + 1) % 100;
    } else if (dir === "L") {
      value = (value - 1) % 100;
    }
    if (value === 0) {
      password++;
    }
  }
}
console.log(password);
