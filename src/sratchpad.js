const heatAdjacent = (location, complexFloorPlan, count = 0) => {
  let a = location[0];
  let b = location[1];
  if (count < 2) {
    count++
  if (complexFloorPlan[a - 1][b].type === "air") {
    if (complexFloorPlan[a - 1][b].airstream) {
      complexFloorPlan[a - 1][b].temp += 1
      heatAdjacent([a - 1, b], complexFloorPlan, count)

    } else complexFloorPlan[a - 1][b].temp += .5
  }
  if (complexFloorPlan[a + 1][b].type === "air") {
    if (complexFloorPlan[a + 1][b].airstream) {
      complexFloorPlan[a + 1][b].temp += 1
      heatAdjacent([a + 1, b], complexFloorPlan, count)
    } else complexFloorPlan[a + 1][b].temp += .5
  }
  if (complexFloorPlan[a][b - 1].type === "air") {
    if (complexFloorPlan[a][b - 1].airstream) {
      complexFloorPlan[a][b - 1].temp += 1
      heatAdjacent([a, b - 1], complexFloorPlan, count)
    } else complexFloorPlan[a][b - 1].temp += .5
  }
  if (complexFloorPlan[a][b + 1].type === "air") {
    if (complexFloorPlan[a][b + 1].airstream) {
      complexFloorPlan[a][b + 1].temp += 1
      heatAdjacent([a, b + 1], complexFloorPlan, count)
    } else complexFloorPlan[a][b + 1].temp += .5
  }
}
