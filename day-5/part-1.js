// read data
const data = (await Deno.readTextFile("./data.txt")).split("\n");

const lookup = {};
let sum = 0;

for (const line of data) {
  const [left, right] = line.split("|");

  // if there's ordering rules (x|y), add to lookup
  if (left && right) {
    lookup[left] || (lookup[left] = {});
    lookup[left][right] = true;
  } else if (line) {
    // otherwise, check the line and sum up (wrong order gives zero)
    const result = checkLine(lookup, line);
    sum += result;
  }
}

// print out result
console.log(sum);

function checkLine(lookup, line) {
  const numbers = line.split(",");

  // iterate left and right pairs
  for (let left = 0; left < numbers.length - 1; left++) {
    for (let right = left + 1; right < numbers.length; right++) {
      const numberLeft = numbers[left];
      const numberRight = numbers[right];
      // if there's no rule, return 0
      if (!lookup[numberLeft]?.[numberRight]) {
        return 0;
      }
    }
  }

  // if pass, return middle number
  return Number(numbers[Math.floor(numbers.length / 2)]);
}
