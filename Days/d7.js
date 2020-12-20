const Utils = require("../Utils/Utils");

exports.PuzzleOne = () => {
  let input = Utils.ReadInput("d7").split("\n");
  input = input.filter(i => i != "");

  // Step 1 - Parse a line
  // Step 2-1 - Get Container Bag
  // Step 2-2 - Get Inner Bags
  // Step 3 - Create a Bag list

  let bag_list = [];
  let keyword = "contain";

  // Parse data into workable form
  input.forEach(line => {
    let index = line.indexOf(keyword);
    let container = line.slice(0, index);
    container = container.replace("bags", "").replace("bag", "").trim();

    let inner_containers = line.slice(index + keyword.length);
    inner_containers = inner_containers.replace(".", "").trim();

    inner_containers = inner_containers.split(",");
    for (let i = 0; i < inner_containers.length; i++) {
      inner_containers[i] = inner_containers[i].trim().slice(1).replace("bags", "").replace("bag", "").trim();
    }

    bag_list.push(new Bag(container, inner_containers));
  });

  // Step 1 - Find all bags who contain shiny
  // Step 2 - Find all bags who contain new bags
  // Repeat until no new bags found

  let shiny = "shiny gold";
  let all_found = false;

  let bags = [ new Bag(shiny, [])];

  while (!all_found) {
    let new_bag_found = false;
    for (let i = 0; i < bag_list.length; i++) {
      for (let j = 0; j < bags.length; j++) {
        if (bag_list[i].inside_bags.findIndex(b => b == bags[j].color) > -1) {
          if (bags.findIndex(b => b.color == bag_list[i].color) == -1) {
            bags.push(bag_list[i]);
            new_bag_found = true;
          }
        }
      }
    }

    all_found = !new_bag_found;
  }

  console.log(bags.length - 1);
  Utils.WriteOutput("d7", "p1", (bags.length - 1).toString());
}

exports.PuzzleTwo = () => {
  let input = Utils.ReadInput("d7").split("\n");
  input = input.filter(i => i != "");

  let bag_list = [];
  let keyword = "contain";
  let no_bags_keyword = "no other bags";

  input.forEach(line => {
    let index = line.indexOf(keyword);
    let container = line.slice(0, index);
    container = container.replace("bags", "").replace("bag", "").trim();

    let inner_containers = line.slice(index + keyword.length);
    inner_containers = inner_containers.replace(".", "").trim();

    let newBag = new MegaBag(container);

    if (inner_containers != no_bags_keyword) {
      inner_containers = inner_containers.split(",");
      for (let i = 0; i < inner_containers.length; i++) {
        inner_containers[i] = inner_containers[i].trim();
        let count = parseInt(inner_containers[i][0]);
        inner_containers[i] = inner_containers[i].slice(1).replace("bags", "").replace("bag", "").trim();

        newBag.addBag(inner_containers[i], count);
      }
    }

    bag_list.push(newBag);
  });

  let shiny_bag = bag_list.find(bag => bag.color == "shiny gold");
  let count = shiny_bag.getBagCount(bag_list);

  console.log(count);
  Utils.WriteOutput("d7", "p2", count.toString());
}

function Bag(color, inside_bags) {
  this.color = color;
  this.inside_bags = inside_bags;
}

function MegaBag(color) {
  this.color = color;

  this.inside_bags = [];
  this.inside_bag_count = [];

  this.empty = true;

  this.addBag = (bag, count) => {
    this.inside_bags.push(bag);
    this.inside_bag_count.push(count);

    this.empty = false;
  }

  this.getBagCount = (bag_list) => {
    if (this.empty) {
      return 0;
    }

    let count = 0;
    
    for (let i = 0; i < this.inside_bags.length; i++) {
      let bag = bag_list.find(b => b.color == this.inside_bags[i]);

      count = count + this.inside_bag_count[i] + (this.inside_bag_count[i] * bag.getBagCount(bag_list));
    }

    return count;
  }
}
