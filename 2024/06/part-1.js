const map = (await Deno.readTextFile("./data.txt")).split("\n").map((line) => {
  return line.split("");
});

const dirs = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const hero = {};

for (let y = 0; y < map.length; y++) {
  const line = map[y];

  for (let x = 0; x < line.length; x++) {
    if (line[x] === "^") {
      hero.x = x;
      hero.y = y;
      hero.dir = 0;
    }
  }
}

await walk(map, hero);

let steps = 0;

for (let y = 0; y < map.length; y++) {
  const line = map[y];

  for (let x = 0; x < line.length; x++) {
    if (line[x] === "X") {
      steps++;
    }
  }
}

console.log(steps);

Deno.writeTextFile("data2.txt", map.map((line) => line.join("")).join("\n"));

async function walk(map, hero) {
  while (true) {
    const { x, y, dir } = hero;
    const [dx, dy] = dirs[dir];
    const nextCell = map[hero.y + dy]?.[hero.x + dx];

    map[y][x] = "X";

    if (!nextCell) {
      return;
    }

    if (nextCell === "#") {
      hero.dir = (dir + 1) % 4;
    } else {
      hero.x = x + dx;
      hero.y = y + dy;
    }
  }
}
