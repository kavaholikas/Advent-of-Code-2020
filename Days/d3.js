const Utils = require("../Utils/Utils");

exports.PuzzleOne = () => {
  let input = Utils.ReadInput("d3").split("\n");
  input = input.filter(i => i != "");

  let width = input[0].length;
  let height = input.length;

  let hits = 0;

  let position = {
    x: 0,
    y: 0
  }

  let loop = true;

  while (loop) {
    position.x = (position.x + 3) % width;
    position.y = position.y + 1;

    if (position.y < height) {
      if (input[position.y][position.x] == "#") {
        hits++;
      }
    } else {
      loop = false;
    }
  }

  console.log(hits);
  Utils.WriteOutput("d3", "p1", hits.toString());
}

exports.PuzzleTwo = () => {
  let input = Utils.ReadInput("d3").split("\n");
  input = input.filter(i => i != "");

  let width = input[0].length;
  let height = input.length;

  let multiplied_hits = 1;

  let rule_sets = [
    { x: 1, y: 1 }, 
    { x: 3, y: 1 }, 
    { x: 5, y: 1 }, 
    { x: 7, y: 1 }, 
    { x: 1, y: 2 }
  ];

  rule_sets.forEach(rule => {
    let hits = 0;
    let position = {
      x: 0,
      y: 0
    }
    
    let loop = true;

    while (loop) {
      position.x = (position.x + rule.x) % width;
      position.y = position.y + rule.y;

      if (position.y < height) {
        if (input[position.y][position.x] == "#") {
          hits++;
        }
      } else {
        loop = false; 
      }
    }

    multiplied_hits *= hits;
  });

  console.log(multiplied_hits);
  Utils.WriteOutput("d3", "p2", multiplied_hits.toString());
}
