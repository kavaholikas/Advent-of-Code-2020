const Utils = require("../Utils/Utils");

exports.PuzzleOne = () => {
    let input = Utils.ReadInput("d6").split("\n\n");

    let count = 0;

    input.forEach(line => {
        let answers = line.split("\n").filter(c => c != "");
        let list = [];

        answers.forEach(a => {
            for (let i = 0; i < a.length; i++) {
                if (list.findIndex(c => c == a[i]) == -1) {
                    list.push(a[i]);
                }
            }
        });

        count = count + list.length;
    });

    console.log(count);
    Utils.WriteOutput("d6", "p1", count.toString());
}

exports.PuzzleTwo = () => {
    let input = Utils.ReadInput("d6").split("\n\n");

    let count = 0;

    input.forEach(line => {
      let answers = line.split("\n").filter(c => c != "");

      let list = []; 

      answers.forEach(a => {
        for (let i = 0; i < a.length; i++) {
          let index = list.findIndex(c => c.answer == a[i]);

          if (index == -1) {
            list.push({ answer: a[i], count: 1 });
          } else {
            list[index].count++;
          }
        }
      });

      for (let i = 0; i < list.length; i++) {
        if (list[i].count == answers.length) {
          count++;
        }
      }
    });

  console.log(count);
  Utils.WriteOutput("d6", "p2", count.toString());
}
