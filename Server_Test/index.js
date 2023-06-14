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

var obj = {
    "first_name": "Vardan",
    "last_name": "Hovsepyan",
    "age": 13,
    "tumo_student": true
}
function main(){
    let file = "hello.txt"
    fs.appendFileSync(file, "Hello world/n")

    //JSON.stringify('{"first_name": "Vardan", "last_name": "Hovsepyan", "age": 13, "tumo_student": true}')
}
main()