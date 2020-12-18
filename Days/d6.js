const Utils = require("../Utils/Utils");

exports.PuzzleOne = () => {
    // Windows version
    let input = Utils.ReadInput("d6").split("\n\r");

    let count = 0;

    input.forEach(line => {
        console.log(line);

        let answers = line.split("\n").filter(c => c != "");

        // read all letters
        // check if already exist
        // if not add to list

        let list = [];

        answers.forEach(a => {
            for (let i = 0; i < a.length; i++) {
                if (list.findIndex(c => c == a[i]) == -1) {
                    list.push(a[i]);
                }
            }
        });
        console.log(answers);
        
        list = list.filter(l => l != "\r");
        console.log(list);

        count = count + list.length;
    });

    console.log(count);
}

exports.PuzzleTwo = () => {

}