const Utils = require("../Utils/Utils");

exports.PuzzleOne = () => {
  let input = Utils.ReadInput("d4").split("\n\n");
  input = input.map(entry => entry.replace(/\n/g, " "));

  let valid = 0;

  let fields = [
    "byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"
  ];

  input.forEach(line => {
    let passport_valid = true;

    fields.every(field => {
      if (line.search(field) == -1) {
        passport_valid = false;
        return false;
      }

      return true;
    });

    if (passport_valid) {
      valid++;
    }
  });
  

  console.log(valid);
  Utils.WriteOutput("d4", "p1", valid.toString());
}

exports.PuzzleTwo = () => {
  let input = Utils.ReadInput("d4").split("\n\n");
  input = input.map(entry => entry.replace(/\n/g, " "));

  let valid = 0;

  //let fields = [
  //"byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"
  //];

  let fields = [
    {
      "name": "byr",
      "rule": (f) => { return Number(f) >= 1920 && Number(f) <= 2002; }
    },
    {
      "name": "iyr",
      "rule": (f) => { return Number(f) >= 2010 && Number(f) <= 2020; }
    },
    {
      "name": "eyr",
      "rule": (f) => { return Number(f) >= 2020 && Number(f) <= 2030; }
    },
    {
      "name": "hgt",
      "rule": (f) => {
        let length = f.length;
        let system = f.slice(-2);
        let number = f.slice(0, length - 2);

        if (system == "cm") {
          return number >= Number(150) && number <= Number(193);
        } else {
          return number >= Number(59) && number <= Number(76);
        }
      }
    },
    {
      "name": "hcl",
      "rule": (f) => {
        if (f.length != 7 || f[0] != "#") {
          return false;
        }

        let code = f.slice(1);

        for (let i = 0; i < code.length; i++) {
          if ( !((code[i] >= '0' && code[i] <= '9') || (code[i] >= 'a' && code[i] <= 'f')) ) {
            return false; 
          }
        }

        return true;
      }
    },
    {
      "name": "ecl",
      "rule": (f) => {
        let color_list = [ "amb", "blu", "brn", "gry", "grn", "hzl", "oth" ];

        return color_list.findIndex(c => c == f) > -1;
      }
    },
    {
      "name": "pid",
      "rule": (f) => {
        if (f.length != 9) {
          return false;
        }

        return typeof Number(f) === "number";
      }
    }
  ];


  input.forEach(line => {
    let passport_fields = line.split(" ");
    passport_fields = passport_fields.filter(p => p != "");

    let field_test = fields.every(field => {
      let contains = false;
      let index = 0;

      for (let j = 0; j < passport_fields.length; j++) {
        if (passport_fields[j].search(field["name"]) > -1) {
          contains = true;
          index = j;
          break;
        }  
      }

      if (contains) {
        let is_valid = field["rule"](passport_fields[index].slice(4));

        if (is_valid) {
          return true;
        }
      }

      return false;
    });

    if (field_test) {
      valid++;
    }
  });

  console.log(valid);
  Utils.WriteOutput("d4", "p2", valid.toString());
}
