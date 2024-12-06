// read map
const map = (await Deno.readTextFile("./data.txt")).split("\n").map((line) => {
  return line.split("");
});
// read solved map
const map2 = (await Deno.readTextFile("./data2.txt"))
  .split("\n")
  .map((line) => {
    return line.split("");
  });

// define directions
const dirs = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

// find hero
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

// count possible loops
let loops = 0;

for (let y = 0; y < map.length; y++) {
  const line = map[y];

  for (let x = 0; x < line.length; x++) {
    const line2 = map2[y];
    if (line[x] === "." && line2[x] === "X") {
      const newMap = map.map((line) => line.slice()).slice();
      newMap[y][x] = "#";
      console.log(x, y);
      if (await detectLoop(newMap, hero)) {
        loops++;
      }
    }
  }
}

console.log(loops);

async function detectLoop(map, hero, visited = {}, count = 0) {
  if (count % 2000 === 0) {
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  const { x, y, dir } = hero;
  const [dx, dy] = dirs[dir];
  const nextCell = map[hero.y + dy]?.[hero.x + dx];

  const hasVisited = visited[y]?.[x]?.[dir];

  if (hasVisited) {
    // if already visited position facing same dir, return true
    return true;
  }

  // mark down visited position and dir
  visited[y] || (visited[y] = {});
  visited[y][x] || (visited[y][x] = []);
  visited[y][x][dir] = true;

  // if next cell outside the map, stop
  if (!nextCell) {
    return false;
  }

  const newHero = {
    x,
    y,
    dir,
  };

  // if next cell is obstructed, turn right
  if (nextCell === "#") {
    newHero.dir = (dir + 1) % 4;
  } else {
    // else, walk one step
    newHero.x = x + dx;
    newHero.y = y + dy;
  }
  // next step
  return await detectLoop(map, newHero, visited, count + 1);
}
