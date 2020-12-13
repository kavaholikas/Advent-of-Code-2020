const Utils = require("../Utils/Utils");

exports.PuzzleOne = () => {
  let input = Utils.ReadInput("d2").split("\n");
  input = input.filter((l) => l !== ""); // For some reason gets last line as empty string

  let count = 0;

  for (let i = 0; i < input.length; i++) {
    let policy = input[i].split(" ");
    let bounds = policy[0].split("-").map(Number);
    let letter = policy[1][0];
    let password = policy[2].split("").filter((c) => c == letter);

    if (password.length >= bounds[0] && password.length <= bounds[1]) {
      count++; 
    }
  }

  console.log(count);
  Utils.WriteOutput("d2", "p2", count.toString());
}

exports.PuzzleTwo = () => {
  let input = Utils.ReadInput("d2").split("\n");
  input = input.filter((l) => l !== ""); // For some reason gets last line as empty string

  let count = 0;

  for (let i = 0; i < input.length; i++) {
    let policy = input[i].split(" ");
    let bounds = policy[0].split("-").map(Number);
    let letter = policy[1][0];
    let password = policy[2];


    let position_one = password[bounds[0] - 1];
    let position_two = password[bounds[1] - 1];

    // fancy xor
    if ((position_one == letter? 1: 0) ^ (position_two == letter? 1: 0)) {
      count++; 
    }
  }

  console.log(count);
  Utils.WriteOutput("d2", "p2", count.toString());
}
