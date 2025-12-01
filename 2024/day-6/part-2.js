const map = (await Deno.readTextFile("./data.txt")).split("\n").map((line) => {
  return line.split("");
});
const map2 = (await Deno.readTextFile("./data2.txt"))
  .split("\n")
  .map((line) => {
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

const visited = {};

let loops = 0;

for (let y = 0; y < map.length; y++) {
  const line = map[y];

  for (let x = 0; x < line.length; x++) {
    const line2 = map2[y];
    if (line[x] === "." && line2[x] === "X") {
      const newMap = map.map((line) => line.slice()).slice();
      newMap[y][x] = "#";
      if (await detectLoop(newMap, { ...hero })) {
        loops++;
      }
    }
  }
}

console.log(loops);

async function detectLoop(map, hero, visited = {}, count = 0) {
  while (true) {
    const { x, y, dir } = hero;
    const [dx, dy] = dirs[dir];
    const nextCell = map[hero.y + dy]?.[hero.x + dx];

    const hasVisited = visited[y]?.[x]?.[dir];

    if (hasVisited) {
      return true;
    }

    visited[y] || (visited[y] = {});
    visited[y][x] || (visited[y][x] = []);
    visited[y][x][dir] = true;

    if (!nextCell) {
      return false;
    }

    if (nextCell === "#") {
      hero.dir = (dir + 1) % 4;
    } else {
      hero.x = x + dx;
      hero.y = y + dy;
    }
  }
}
