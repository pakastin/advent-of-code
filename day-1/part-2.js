// parse data
const data = await Deno.readTextFile("data.txt");
const lines = data.split("\n").map((line) => {
  return line.split("   ").map((val) => Number(val));
});

// split to two arrays
const arrayA = lines.map(([a, b]) => a);
const arrayB = lines.map(([a, b]) => b);

// calculate lookup table for how many same numbers in array B
const lookup = arrayB.reduce((lookup, item) => {
  lookup[item] || (lookup[item] = 0);
  lookup[item]++;
  return lookup;
}, {});

// make array of similarities
const similarities = [];
for (let i = 0; i < arrayA.length; i++) {
  const a = arrayA[i];

  similarities.push(a * lookup[a] || 0);
}

// sum up
const sum = similarities.reduce((sum, num) => {
  sum += num;
  return sum;
}, 0);

// print out result
console.log(sum);
