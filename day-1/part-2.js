const data = await Deno.readTextFile("data.txt");
const lines = data.split("\n").map((line) => {
  return line.split("   ").map((val) => Number(val));
});

const arrayA = lines.map(([a, b]) => a);
const arrayB = lines.map(([a, b]) => b);

const lookup = arrayB.reduce((lookup, item) => {
  lookup[item] || (lookup[item] = 0);
  lookup[item]++;
  return lookup;
}, {});

const similarities = [];
for (let i = 0; i < arrayA.length; i++) {
  const a = arrayA[i];

  similarities.push(a * lookup[a] || 0);
}

const sum = similarities.reduce((sum, num) => {
  sum += num;
  return sum;
}, 0);

console.log(sum);
