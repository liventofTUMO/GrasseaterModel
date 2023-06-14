console.log("Hallo nodJS...");
const os = require("os");
let message = "Die Platform ist ";

function main(){
    console.log(message + os.platform())
}
main()