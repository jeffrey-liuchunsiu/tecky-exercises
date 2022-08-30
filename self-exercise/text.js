function main() {
  if (2 > 0.1) {
    console.log("2.1");
    next(); // Going to run the next middleware
    // return;
    console.log("2.2");
  }
  console.log("4");
}
main();
// Skip all middlewares afterwards
console.log("1");

function next() {
  next2();
  console.log(" 2.3");
}
function next2() {
  console.log(" 2.4");
}
