const data = await Deno.readTextFile("./data.txt");
const lines = data
  .split("\n")
  .map((line) => line.split(" ").map((val) => Number(val)));

const safe = lines.filter(
  (line) => checkLine(line) || checkLineWithDampening(line)
);

console.log(safe.length);

function checkLineWithDampening(line) {
  for (let i = 0; i < line.length; i++) {
    if (checkLine(line.slice(0, i).concat(line.slice(i + 1)))) {
      return true;
    }
  }
  return false;
}

function checkLine(line) {
  let prevDiff;
  for (let i = 1; i < line.length; i++) {
    let value = line[i];
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
}
