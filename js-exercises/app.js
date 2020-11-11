// Creating functions as properties for objects
// Below shows an example of object squre with functions as properties.
// To call you would use square.area([num]) or square.perimeter([num])
const square = {
  area(side) {
    return side ** 2;
  },
  perimeter(side) {
    return side * 4;
  },
};

const hen = {
  name: "Helen",
  eggCount: 0,
  layAnEgg() {
    this.eggCount += 1;
    return "Laid an EGG!!";
  },
  smashAnEgg() {
    if (this.eggCount > 0) {
      this.eggCount -= 1;
      return `Killed your baby! ${this.eggCount} eggs left`;
    }
    return "No eggs to smash...";
  },
};
