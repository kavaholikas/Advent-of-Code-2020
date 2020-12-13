const fs = require("fs");

exports.ReadInput = (day) => {
  return fs.readFileSync(`./Input/${day}-input`, "utf8"); 
}

exports.WriteOutput = (day, puzzle, output) => {
  fs.writeFileSync(`./Output/${day}-${puzzle}-output`, output);
}
