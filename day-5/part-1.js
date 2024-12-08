const data = (await Deno.readTextFile("./data.txt")).split("\n");

const lookup = {};
let sum = 0;

for (const line of data) {
  const [left, right] = line.split("|");

  if (left && right) {
    lookup[left] || (lookup[left] = {});
    lookup[left][right] = true;
  } else if (line) {
    const result = checkLine(lookup, line);
    sum += result;
  }
}

console.log(sum);

function checkLine(lookup, line) {
  const numbers = line.split(",");

  for (let left = 0; left < numbers.length - 1; left++) {
    for (let right = left + 1; right < numbers.length; right++) {
      const numberLeft = numbers[left];
      const numberRight = numbers[right];

      if (!lookup[numberLeft]?.[numberRight]) {
        return 0;
      }
    }
  }

  return Number(numbers[Math.floor(numbers.length / 2)]);
}
