// read map
const map = (await Deno.readTextFile("./data.txt")).split("\n").map((line) => {
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

// walk the map
await step(map, hero);

// count steps (X)
let steps = 0;

for (let y = 0; y < map.length; y++) {
  const line = map[y];

  for (let x = 0; x < line.length; x++) {
    if (line[x] === "X") {
      steps++;
    }
  }
}

// print out the answer
console.log(steps);

async function step(map, hero) {
  await new Promise((resolve) => setTimeout(resolve, 0));
  const { x, y } = hero;
  const [dx, dy] = dirs[hero.dir];
  const nextCell = map[hero.y + dy]?.[hero.x + dx];

  // mark cell visited
  map[y][x] = "X";

  // if next cell outside the map, stop
  if (!nextCell) {
    return;
  }

  // if next cell is obstructed, turn right
  if (nextCell === "#") {
    hero.dir = (hero.dir + 1) % 4;
  } else {
    // else, walk one step
    hero.x = x + dx;
    hero.y = y + dy;
  }
  // next step
  return await step(map, hero);
}
