// console.log("Hallo nodJS...");
// const os = require("os");
// let message = "Die Platform ist ";

// function main(){
//     console.log(message + os.platform())
// }
// main()

// const Square = require("./module")
// function main(){
//     let Square = new Square(50)
//     console.log(square.getArea())
// }

const fs = require("fs")

function main(){
    let file = "hello.txt"
    fs.appendFileSync(file, "Hello world/n")
}