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
      const distX = leftX - rightX;
      const distY = leftY - rightY;

      let x1 = leftX;
      let y1 = leftY;

      while (data[y1]?.[x1]) {
        if (data[y1][x1] === ".") {
          data[y1][x1] = "#";
        }

        x1 -= distX;
        y1 -= distY;
      }

      let x2 = rightX;
      let y2 = rightY;

      while (data[y2]?.[x2]) {
        if (data[y2][x2] === ".") {
          data[y2][x2] = "#";
        }

        x2 += distX;
        y2 += distY;
      }
    }
  }
}

let locations = 0;

for (const line of data) {
  for (const char of line) {
    if (char !== ".") {
      locations++;
    }
  }
}

console.log(locations);
