// read map
const data = (await Deno.readTextFile("./data.txt"))
  .split("\n")
  .map((line) => [...line]);

const lookup = {};

for (let y = 0; y < data.length; y++) {
  for (let x = 0; x < data[y].length; x++) {
    const char = data[y][x];

    if (char !== ".") {
      lookup[char] || (lookup[char] = []);
      lookup[char].push([x, y]);
    }
  }
}

for (const frequency in lookup) {
  const antennas = lookup[frequency];

  for (let left = 0; left < antennas.length - 1; left++) {
    for (let right = left + 1; right < antennas.length; right++) {
      const [leftX, leftY] = antennas[left];
      const [rightX, rightY] = antennas[right];

      const x1 = leftX - (leftX - rightX) * 2;
      const y1 = leftY - (leftY - rightY) * 2;

      const x2 = rightX + (leftX - rightX) * 2;
      const y2 = rightY + (leftY - rightY) * 2;

      if (data[y1]?.[x1]) {
        data[y1][x1] = "#";
      }
      if (data[y2]?.[x2]) {
        data[y2][x2] = "#";
      }
    }
  }
}

let locations = 0;

for (const line of data) {
  for (const char of line) {
    if (char === "#") {
      locations++;
    }
  }
}

console.log(locations);
