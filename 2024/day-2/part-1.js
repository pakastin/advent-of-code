const data = await Deno.readTextFile("./data.txt");
const lines = data
  .split("\n")
  .map((line) => line.split(" ").map((val) => Number(val)));

const safe = lines.filter((line) => {
  let prevDiff;
  for (let i = 1; i < line.length; i++) {
    const value = line[i];
    const prevValue = line[i - 1];
    const diff = value - prevValue;
    const absDiff = Math.abs(diff);

    if (absDiff < 1 || absDiff > 3) {
      return false;
    }

    if (prevDiff) {
      if (prevDiff * diff < 0) {
        return false;
      }
    }
    prevDiff = diff;
  }
  return true;
});

console.log(safe.length);
