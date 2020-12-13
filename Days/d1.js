const Utils = require("../Utils/Utils");

exports.PuzzleOne = () => {
  let input = Utils.ReadInput("d1").split("\n").map(Number);

  let result = 0;

  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (input[i] + input[j] == 2020) {
        result = input[i] * input[j];
        break;
      }
    }

    if (result != 0) {
      break;
    }
  }

  console.log(result);

  Utils.WriteOutput("d1", "p1", result.toString());
}

exports.PuzzleTwo = () => {
  let input = Utils.ReadInput("d1").split("\n").map(Number);

  let result = 0;

  for (let i = 0; i < input.length - 2; i++) {
    for (let j = i + 1; j < input.length - 1; j++) {
      for (let k = j + 1; k < input.length; k++) {
        let a = input[i], s = input[j], d = input[k];

        if (a + s + d == 2020) {
          result = a * s *d;
          break;
        }
      }

      if (result != 0) {
        break;
      }
    }

    if (result != 0) {
      break;
    }
  }

  console.log(result);

  Utils.WriteOutput("d1", "p2", result.toString());

}
