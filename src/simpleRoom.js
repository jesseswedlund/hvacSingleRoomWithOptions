// //original layout
const room = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 2, 2, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 4, 4, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// const room = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 1, 1, 1, 2, 2, 1, 1, 1, 0],
//   [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
//   [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
//   [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
//   [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
//   [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
//   [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
//   [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// ];

const turnOnHeat = (floorPlan) => {
  console.log("<<<<<<ORINGINAL ROOM>>>>>>", room);

  //intitiate heat
  for (let i = 0; i < floorPlan.length; i++) {
    for (let j = 0; j < floorPlan[0].length; j++) {
      if (floorPlan[i][j] === 2) {
        floorPlan[i + 1][j] = 3;
      }
    }
  }

  console.log("<<<<<<AFTER HEAT TURNED ON>>>>>>", room);

  //continue to heat until every locale is heated
  let cycles = 0;
  while (!floorPlan.every((row) => row.every((cell) => cell !== 0))) {
    heatingCycle(floorPlan);
    cycles++;
    console.log(`<<<<<<AFTER CYCLE ${cycles}>>>>>>`, room);
  }

  return floorPlan;
};

const heatAdjacent = (location, floorPlan) => {
  let a = location[0];
  let b = location[1];

  if (floorPlan[a - 1][b] === 0) floorPlan[a - 1][b] = 3;
  if (floorPlan[a + 1][b] === 0) floorPlan[a + 1][b] = 3;
  if (floorPlan[a][b - 1] === 0) floorPlan[a][b - 1] = 3;
  if (floorPlan[a][b + 1] === 0) floorPlan[a][b + 1] = 3;

  return floorPlan;
};

const heatingCycle = (floorPlan) => {
  locationsToHeat = [];
  for (let i = 0; i < floorPlan.length; i++) {
    for (let j = 0; j < floorPlan[0].length; j++) {
      //if (floorPlan[i][j] === 2) continue //continue to heat
      if (floorPlan[i][j] === 3) locationsToHeat.push([i, j]);
    }
  }

  locationsToHeat.forEach((locale) => heatAdjacent(locale, floorPlan));

  return floorPlan;
};

turnOnHeat(room);

// //after heat on
// [
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 0, 0, 0, 2, 2, 0, 0, 0, 1],
//   [1, 0, 0, 0, 3, 3, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 4, 4, 0, 0, 0, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// ]

// //after 1 cycles
// [
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 0, 0, 0, 2, 2, 0, 0, 0, 1],
//   [1, 0, 0, 3, 3, 3, 3, 0, 0, 1],
//   [1, 0, 0, 0, 3, 3, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 4, 4, 0, 0, 0, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// ]

// //after 2 cycles
// [
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 0, 0, 3, 2, 2, 3, 0, 0, 1],
//   [1, 0, 3, 3, 3, 3, 3, 3, 0, 1],
//   [1, 0, 0, 3, 3, 3, 3, 0, 0, 1],
//   [1, 0, 0, 0, 3, 3, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 4, 4, 0, 0, 0, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// ]

// //after 3 cycles
// [
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 0, 3, 3, 2, 2, 3, 3, 0, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 0, 3, 3, 3, 3, 3, 3, 0, 1],
//   [1, 0, 0, 3, 3, 3, 3, 0, 0, 1],
//   [1, 0, 0, 0, 3, 3, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 4, 4, 0, 0, 0, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// ]

// //after 4 cycles
// [
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 3, 3, 3, 2, 2, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 0, 3, 3, 3, 3, 3, 3, 0, 1],
//   [1, 0, 0, 3, 3, 3, 3, 0, 0, 1],
//   [1, 0, 0, 0, 3, 3, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 4, 4, 0, 0, 0, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// ]

// //after 5 cycles
// [
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 3, 3, 3, 2, 2, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 0, 3, 3, 3, 3, 3, 3, 0, 1],
//   [1, 0, 0, 3, 3, 3, 3, 0, 0, 1],
//   [1, 0, 0, 0, 3, 3, 0, 0, 0, 1],
//   [1, 0, 0, 0, 4, 4, 0, 0, 0, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// ]

// //after 6 cycles
// [
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 3, 3, 3, 2, 2, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 0, 3, 3, 3, 3, 3, 3, 0, 1],
//   [1, 0, 0, 3, 3, 3, 3, 0, 0, 1],
//   [1, 0, 0, 0, 4, 4, 0, 0, 0, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// ]

// //after 7 cycles
// [
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 3, 3, 3, 2, 2, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 0, 3, 3, 3, 3, 3, 3, 0, 1],
//   [1, 0, 0, 3, 4, 4, 3, 0, 0, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// ]

// //after 8 cycles
// [
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 3, 3, 3, 2, 2, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 0, 3, 3, 4, 4, 3, 3, 0, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// ]

// //after 9 cycles
// [
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 3, 3, 3, 2, 2, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//   [1, 3, 3, 3, 4, 4, 3, 3, 3, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// ]

// 0 = unheated air
// 1 = wall
// 2 = heater
// 3= heated air
// 4 = intake
