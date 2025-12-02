import { readFile } from "node:fs/promises";

const data = await readFile("data.txt", "utf-8");

let sum = 0;

for (const range of data.split(",")) {
  const [start, end] = range.split("-").map((str) => Number(str));

  for (let id = start; id <= end; id++) {
    const str = String(id);
    if (str.length % 2 > 0) {
      continue;
    }
    const strHalf = str.slice(0, str.length / 2);
    if (str.endsWith(strHalf)) {
      sum += id;
    }
  }
}
console.log(sum);
