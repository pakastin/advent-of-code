const disk = await Deno.readTextFile("data.txt");

const blocks = [];

for (let i = 0; i < disk.length; i += 2) {
  const id = i / 2;
  const data = Number(disk[i]);
  const space = Number(disk[i + 1]);

  blocks.push({
    i,
    type: "data",
    id,
    size: data,
  });
  if (space) {
    blocks.push({
      i,
      type: "space",
      id: null,
      size: space,
    });
  }
}

const dataBlocks = blocks.filter((block) => block.type === "data").reverse();

for (const dataBlock of dataBlocks) {
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    if (block.i >= dataBlock.i) {
      break;
    }

    if (block.type === "space") {
      if (block.size >= dataBlock.size) {
        const diff = block.size - dataBlock.size;
        block.type = "data";
        block.id = dataBlock.id;
        block.size = dataBlock.size;
        dataBlock.type = "space";
        dataBlock.id = null;
        if (diff) {
          blocks.splice(i + 1, 0, {
            type: "space",
            i: block.i + block.size,
            id: null,
            size: diff,
          });
        }
        break;
      }
    }
  }
}

const results = [];

for (const block of blocks) {
  for (let i = 0; i < block.size; i++) {
    results.push(block.type === "space" ? 0 : block.id);
  }
}

let checksum = 0;

for (let i = 0; i < results.length; i++) {
  checksum += i * results[i];
}

console.log(checksum);
