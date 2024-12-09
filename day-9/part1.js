const data = await Deno.readTextFile("data.txt");
let parsed = [];
let checksum = 0;

for (let i = 0; i < data.length; i += 2) {
  const file = Number(data[i]);
  const space = Number(data[i + 1]);
  const id = i / 2;
  parsed = parsed.concat(repeat(file, id));
  if (space) {
    parsed = parsed.concat(repeat(space, "."));
  }
}

console.log(parsed.join(""));

const freeBlocks = [];
const dataBlocks = [];

for (let i = 0; i < parsed.length; i++) {
  if (parsed[i] === ".") {
    freeBlocks.push(i);
  } else {
    dataBlocks.push(i);
  }
}

console.log(dataBlocks);

let left = 0;
let right = dataBlocks.length - 1;

while (true) {
  const freeBlock = freeBlocks[left++];
  const dataBlock = dataBlocks[right--];

  if (freeBlock > dataBlock || freeBlock == null || dataBlock == null) {
    break;
  }

  parsed[freeBlock] = parsed[dataBlock];
  parsed[dataBlock] = ".";
}

console.log(parsed.join(""));

for (let i = 0; i < parsed.length; i++) {
  if (parsed[i] === ".") {
    break;
  }
  checksum += i * parsed[i];
}

console.log(checksum);

function repeat(times, char) {
  const result = new Array(times);

  for (let i = 0; i < times; i++) {
    result[i] = char;
  }

  return result;
}
