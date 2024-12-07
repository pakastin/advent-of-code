// read map
const data = (await Deno.readTextFile("./data.txt")).split("\n");

let sum = 0;

for (const line of data) {
  const targetResult = Number(line.split(":")[0]);
  const numbers = line
    .split(" ")
    .slice(1)
    .map((str) => Number(str));

  line: for (let i = 0; i < Math.pow(3, numbers.length - 1); i++) {
    const operations = i.toString(3).padStart(numbers.length - 1, "0");

    let result = numbers[0];
    for (let i = 0; i < numbers.length - 1; i++) {
      if (operations[i] === "0") {
        result += numbers[i + 1];
      } else if (operations[i] === "1") {
        result *= numbers[i + 1];
      } else {
        result = Number(`${result}${numbers[i + 1]}`);
      }
    }
    if (result === targetResult) {
      sum += result;
      break line;
    }
  }
}

console.log(sum);
