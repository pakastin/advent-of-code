const data = (await Deno.readTextFile("data.txt")).split("\n").map((line) => {
  return line.split("   ");
});

const arrayA = data.map(([a, b]) => a);
const arrayB = data.map(([a, b]) => b);

arrayA.sort();
arrayB.sort();

const distances = [];

for (let i = 0; i < arrayA.length; i++) {
  const a = arrayA[i];
  const b = arrayB[i];

  distances.push(Math.abs(a - b));
}

const sum = distances.reduce((sum, num) => {
  sum += num;
  return sum;
}, 0);

console.log(sum);
