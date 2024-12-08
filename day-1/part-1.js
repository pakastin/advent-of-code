const data = await Deno.readTextFile("data.txt");
const lines = data.split("\n").map((line) => {
  return line.split("   ").map((val) => Number(val));
});

const arrayA = lines.map(([a, b]) => a);
const arrayB = lines.map(([a, b]) => b);

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
