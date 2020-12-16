const Utils = require("../Utils/Utils");

exports.PuzzleOne = () => {
  let input = Utils.ReadInput("d5").split("\n");
  input = input.filter(c => c != "");

  let max_id = 0;

  input.forEach(line => {
    let row_range = 127;
    let row = 0;

    for (let i = 0; i < 7; i++) {
      row_range = parseInt(row_range / 2);
      if (line[i] == "B") {
        row = row + row_range + 1;
      }
    }

    let column_range = 7;
    let column = 0;

    for (let i = 7; i < 10; i ++) {
      column_range = parseInt(column_range / 2);
      if (line[i] == "R") {
        column = column + column_range + 1; 
      }
    }

    max_id = Math.max(max_id, row * 8 + column);
  });

  console.log(max_id);
  Utils.WriteOutput("d5", "p1", max_id.toString());
}

exports.PuzzleTwo = () => {
  let input = Utils.ReadInput("d5").split("\n");
  input = input.filter(c => c != "");

  let list_of_ids = [];

  /*
  let sum_of_all_ids = 0;
  let min_id = 2 * 8 + 7;
  let max_id = 125 * 8 + 0;

  for (let i = 0; i < 128; i++) {
    for (let j = 0; j < 8; j++) {
      sum_of_all_ids += (i * 8 + j);
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 8; j++) {
      sum_of_all_ids -= (i * 8 + i);
      sum_of_all_ids -= ((127 - i) * 8 + i);
    }
  }
  */

  input.forEach(line => {
    let row_range = 127;
    let row = 0;

    for (let i = 0; i < 7; i++) {
      row_range = parseInt(row_range / 2);
      if (line[i] == "B") {
        row = row + row_range + 1;
      }
    }

    let column_range = 7;
    let column = 0;

    for (let i = 7; i < 10; i ++) {
      column_range = parseInt(column_range / 2);
      if (line[i] == "R") {
        column = column + column_range + 1; 
      }
    }

    let id = row * 8 + column;
    list_of_ids.push(id);

    /*
    if (id > min_id && id < max_id) {
      sum_of_all_ids -= id;
    }
    */
  });


  // sort list_of_ids
  
  list_of_ids = quickSort(list_of_ids);
  let last = list_of_ids[0];
  let id = 0;

  for (let i = 1; i < list_of_ids.length; i++) {
    if (last + 1 != list_of_ids[i]) {
      id = last + 1;
      break;
    }

    last = list_of_ids[i];
  }

  console.log(id);
  Utils.WriteOutput("d5", "p2", id.toString());
}

const quickSort = (originalList) => {
  const list = [...originalList]

  if (list.length < 2) {
    return list
  }

  const pivot = list[0]

  const smaller = list.filter((item) => item < pivot)
  const bigger = list.filter((item) => item > pivot)

  return [...quickSort(smaller), pivot, ...quickSort(bigger)]
}
