const data = await Deno.readTextFile("./data.txt");

let sum = 0;

for (const mul of data.split("mul(").slice(1)) {
  const num1 = mul.split(",")[0];
  const num2 = mul.split(",")[1]?.split(")")[0];

  if (!isNumber(num1) || !isNumber(num2)) {
    continue;
  }

  sum += Number(num1) * Number(num2);
}

console.log(sum);

function isNumber(num) {
  return num === String(Number(num));
}
