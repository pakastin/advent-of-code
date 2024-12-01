const data = (await Deno.readTextFile("data.txt")).split("\n").map((line) => {
  return line.split("   ");
});

const arrayA = data.map(([a, b]) => a);
const arrayB = data.map(([a, b]) => b);

arrayA.sort();
arrayB.sort();

const similarities = [];
const lookup = arrayB.reduce((lookup, item) => {
  lookup[item] || (lookup[item] = 0);
  lookup[item]++;
  return lookup;
}, {});

for (let i = 0; i < arrayA.length; i++) {
  const a = arrayA[i];

  similarities.push(a * lookup[a] || 0);
}

const sum = similarities.reduce((sum, num) => {
  sum += num;
  return sum;
}, 0);

console.log(sum);
