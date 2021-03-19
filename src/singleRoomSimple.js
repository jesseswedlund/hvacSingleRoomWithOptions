export const floorPlan = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 2, 2, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];


export const turnOnSimpleHeat = (animationData) => {
  console.log("<<<<<<ORINGINAL ROOM>>>>>>", floorPlan);
  let points;
  let max = 3;
  let min = 1
  let width = 400;
  let height = 400;

  let startPoints = [];
  floorPlan.forEach((row, i) => {
    row.forEach((cell, j) => {
      startPoints.push({ x: j * 40 + 20, y: i * 40 + 20, value: cell });
    });
  });
  animationData.push({max: max, data: startPoints });

  //intitiate heat
  let firstPoints = [];
  for (let i = 0; i < floorPlan.length; i++) {
    for (let j = 0; j < floorPlan[0].length; j++) {
      if (floorPlan[i][j] === 2) {
        floorPlan[i + 1][j] = 3;
      }
      firstPoints.push({
        x: j * 40 + 20,
        y: i * 40 + 20,
        value: floorPlan[i][j],
      });
    }
  }
  animationData.push({ min: min, max: max, data: firstPoints });

  console.log("<<<<<<AFTER HEAT TURNED ON>>>>>>", floorPlan);

  //continue to heat until every locale is heated
  let cycles = 0;

  while (!floorPlan.every((row) => row.every((cell) => cell !== 0))) {
    heatingCycle(floorPlan);
    points = [];

    for (let i = 0; i < floorPlan.length; i++) {
      for (let j = 0; j < floorPlan[0].length; j++) {
        let val = floorPlan[i][j];
        var point = {
          x: j * 40 + 20,
          y: i * 40 + 20,
          value: val,
        };
        points.push(point);
      }
    }
    cycles++;
    console.log(`<<<<<<AFTER CYCLE ${cycles}>>>>>>`, floorPlan);
    let data = { min: min, max: max, data: points };
    console.log(data);
    animationData.push(data);
  }
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
  let locationsToHeat = [];
  for (let i = 0; i < floorPlan.length; i++) {
    for (let j = 0; j < floorPlan[0].length; j++) {
      //if (floorPlan[i][j] === 2) continue //continue to heat
      if (floorPlan[i][j] === 3) locationsToHeat.push([i, j]);
    }
  }

  locationsToHeat.forEach((locale) => heatAdjacent(locale, floorPlan));

  return floorPlan;
};
