// read data
const data = await Deno.readTextFile("./data.txt");

let sum = 0;

// split strings between "mul("
for (const mul of data.split("mul(").slice(1)) {
  // first number expected to be before ","
  const num1 = mul.split(",")[0];
  // second number expected to be after first "," and before first ")"
  const num2 = mul.split(",")[1]?.split(")")[0];

  // check if actually numbers
  if (!isNumber(num1) || !isNumber(num2)) {
    continue;
  }

  // sum up
  sum += Number(num1) * Number(num2);
}

// print out result
console.log(sum);

function isNumber(num) {
  return num === String(Number(num));
}
