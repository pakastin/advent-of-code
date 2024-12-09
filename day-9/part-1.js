const disk = await Deno.readTextFile("data.txt");
let parsed = [];
let checksum = 0;

for (let i = 0; i < disk.length; i += 2) {
  const data = Number(disk[i]);
  const space = Number(disk[i + 1]);
  const id = i / 2;
  parsed = parsed.concat(repeat(data, id));
  if (space) {
    parsed = parsed.concat(repeat(space, "."));
  }
}

console.log(parsed.join(""));

const emptyBlocks = [];
const dataBlocks = [];

for (let i = 0; i < parsed.length; i++) {
  if (parsed[i] === ".") {
    emptyBlocks.push(i);
  } else {
    dataBlocks.push(i);
  }
}

console.log(dataBlocks);

let left = 0;
let right = dataBlocks.length - 1;

while (true) {
  const freeBlock = emptyBlocks[left++];
  const dataBlock = dataBlocks[right--];

  if (freeBlock > dataBlock || freeBlock == null || dataBlock == null) {
    break;
  }

  parsed[freeBlock] = parsed[dataBlock];
  parsed[dataBlock] = ".";
}

console.log(parsed);

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
