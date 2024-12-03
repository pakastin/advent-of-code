const data = await Deno.readTextFile("./data.txt");

let sum = 0;

for (const part of data.split("do()")) {
  const enabled = part.split("don't()")[0];
  for (const mul of enabled.split("mul(")) {
    const num1 = mul.split(",")[0];
    const num2 = mul.split(",")[1]?.split(")")[0];

    if (!isNumber(num1) || !isNumber(num2)) {
      continue;
    }

    sum += Number(num1) * Number(num2);
  }
}

console.log(sum);

function isNumber(num) {
  return num === String(Number(num));
}
