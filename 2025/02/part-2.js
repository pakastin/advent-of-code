import { readFile } from "node:fs/promises";

const data = await readFile("data.txt", "utf-8");

let sum = 0;

for (const range of data.split(",")) {
  const [start, end] = range.split("-").map((str) => Number(str));

  for (let id = start; id <= end; id++) {
    const str = String(id);
    if (str.length === 1) {
      continue;
    }
    const validId = (() => {
      for (let i = 1; i <= str.length / 2; i++) {
        const isFactor = str.length % i === 0;
        if (!isFactor) {
          continue;
        }
        const factor = i;
        const found = (() => {
          for (let i = 1; i < str.length / factor; i++) {
            const start = i * factor;
            const end = (i + 1) * factor;
            const prevStart = (i - 1) * factor;
            const prevEnd = i * factor;
            const slice = str.slice(start, end);
            const prevSlice = str.slice(prevStart, prevEnd);
            if (slice !== prevSlice) {
              return false;
            }
          }
          return true;
        })();
        if (found) {
          return true;
        }
      }
    })();
    if (validId) {
      sum += id;
    }
  }
}
console.log(sum);
