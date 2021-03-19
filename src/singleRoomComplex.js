const floorPlan = [
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

export const turnOnComplexHeat = (animationData) => {
  const complexFloorPlan = floorPlan.map((row, i) => row.map((cell, j) => {
    let unit = {}
    unit.type = cell === 1 ? "wall" : cell === 2 ? "supply" : "air"
    unit.temp = cell === 1 ? 50 : cell === 2 ? 90 : 50
    return unit
  }))

  console.log("<<<<<<ORINGINAL ROOM>>>>>>", complexFloorPlan);

  let points;
  let min = 45
  let max = 90;

  let startPoints = [];
  complexFloorPlan.forEach((row, i) => {
    row.forEach((cell, j) => {
      startPoints.push({ x: j * 40 + 20, y: i * 40 + 20, value: cell.temp });
    });
  });
  animationData.push({ min: min, max: max, data: startPoints });

  //intitiate heat
  let firstPoints = [];
  for (let i = 0; i < complexFloorPlan.length; i++) {
    for (let j = 0; j < complexFloorPlan[0].length; j++) {
      if (complexFloorPlan[i][j].type === "supply") {
        complexFloorPlan[i + 1][j].temp += 1;
      }
      firstPoints.push({
        x: j * 40 + 20,
        y: i * 40 + 20,
        value: complexFloorPlan[i][j].temp,
      });
    }
  }
  animationData.push({ min: min, max: max, data: firstPoints });

  console.log("<<<<<<AFTER HEAT TURNED ON>>>>>>", complexFloorPlan);

  //continue to heat until every locale is heated
  let cycles = 0;

  while (!complexFloorPlan.every((row) => row.every((cell) => cell.type === "air" ? cell.temp >= 68 : true))) {
    heatingCycle(complexFloorPlan);
    points = [];

    for (let i = 0; i < complexFloorPlan.length; i++) {
      for (let j = 0; j < complexFloorPlan[0].length; j++) {
        let val = complexFloorPlan[i][j].temp;
        var point = {
          x: j * 40 + 20,
          y: i * 40 + 20,
          value: val,
        };
        points.push(point);
      }
    }
    cycles++;
    let data = { min: min, max: max, data: points };
    animationData.push(data);
    console.log(cycles)
  }
};

const heatAdjacent = (location, complexFloorPlan) => {
  let a = location[0];
  let b = location[1];

  if (complexFloorPlan[a - 1][b].type === "air") complexFloorPlan[a - 1][b].temp += 1
  if (complexFloorPlan[a + 1][b].type === "air") complexFloorPlan[a + 1][b].temp += 1
  if (complexFloorPlan[a][b - 1].type === "air") complexFloorPlan[a][b - 1].temp += 1
  if (complexFloorPlan[a][b + 1].type === "air") complexFloorPlan[a][b + 1].temp += 1

  return complexFloorPlan;
};

const heatingCycle = (complexFloorPlan) => {
  let locationsToHeat = [];
  for (let i = 0; i < complexFloorPlan.length; i++) {
    for (let j = 0; j < complexFloorPlan[0].length; j++) {
      //if (complexFloorPlan[i][j] === 2) continue //continue to heat
      if (complexFloorPlan[i][j].temp > 50 && complexFloorPlan[i][j].type === "air") locationsToHeat.push([i, j]);
    }
  }

  locationsToHeat.forEach((locale) => heatAdjacent(locale, complexFloorPlan));

  return complexFloorPlan;
};
