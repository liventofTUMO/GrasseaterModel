const Grass = require("./Class_Grass.js")
const GrassEater = require("./Class_GrassEater.js")
const MeatEater = require("./Class_MeatEater.js")
const Mushroom = require("./Class_Mushroom.js")
const EverythingEater = require("./Class_EverythingEater.js")

const express = require("express")
const app = express()

const server = require("http").Server(app)
const io = require("socket.io")(server)

app.use(express.static("./"))
app.get("/", function (req, res){
    res.redirect("client.html")
})

const matrix = [
    [1,0,0,0,1,0,0,1,1,1,0],
    [1,0,0,0,1,0,0,1,1,1,0],
    [1,0,0,0,1,0,0,1,1,1,0],
    [1,0,0,0,1,0,0,1,1,1,0],
    [1,0,0,0,1,0,0,1,1,1,0],
    [1,0,0,0,1,0,0,1,1,1,0]
];
matrix.clear = (row, column) => {
    matrix[column][row] = 0
}
matrix.place = (row, column, creature) => {
    matrix[column][row] = creature
}

const side = 10
const fr = 10

const grassArr = []
const grassEaterArr = []
const meatEaterArr = []
const mushroomArr = []
const everythingEaterArr = []

function placeRandomMushroom() {
    const raY = Math.floor(random(0, matrix.length))
    const raX = Math.floor(random(0, matrix[0].length))
    matrix[raY][raX] = Mushroom.Creature_ID
}


function initGame(){
    //configureMatrix(35,35)
    //console.log(matrix)

    //placeRandomMushroom()
    for(let column = 0; column < matrix.length; column ++){
        for(let row = 0; row < matrix[column].length; row++){
            const creatureType = matrix[column][row]
            if (creatureType == Grass.Creature_ID){
                const grass = new Grass(row, column)
                grassArr.push(grass)
            } else if (creatureType == GrassEater.Creature_ID){
                const grassEater = new GrassEater(row,column)
                grassEaterArr.push(grassEater)
            } else if (creatureType == MeatEater.Creature_ID){
                const meatEater = new MeatEater(row,column)
                meatEaterArr.push(meatEater)
            } else if (creatureType == Mushroom.Creature_ID){
                const mushroom = new Mushroom(row,column)
                mushroomArr.push(mushroom)
            } else if (creatureType == EverythingEater.Creature_ID){
                const everythingEater = new EverythingEater(row,column)
                everythingEaterArr.push(everythingEater)
            }
        }
    }
}


function updateGame(){
    for (grass of grassArr){
        grass.multiply()
    }
    for (grassEater of grassEaterArr){
        grassEater.eat()
        grassEater.multiply()
    }
    for (meatEater of meatEaterArr){
        meatEater.eat()
    }
    for (mushroom of mushroomArr){
        mushroom.respawnGrass()
    }
    for (everythingEater of everythingEaterArr){
        everythingEater.eat()
    }
    for(let height = 0; height < matrix.length; height ++){
        const row = matrix[height];
        for(let width = 0; width < row.length; width++){
            const cell = row[width];
            if(cell== 0){
                fill("white")
            }else if(cell== Grass.Creature_ID){
                fill("green")
            }else if(cell== GrassEater.Creature_ID){
                fill("yellow")
            }else if(cell== MeatEater.Creature_ID){
                fill("red")
            }else if(cell== Mushroom.Creature_ID){
                fill("purple")
            }else if(cell== EverythingEater.Creature_ID){
                fill("black")
            }else if(cell== 6){
                fill("brown")
            }
            rect(width * side, height * side, side, side)
        }
    }
}

function configureMatrix(columns, rows) {
    const creatureTypes = [
        0,
        Grass.Creature_ID,
        GrassEater.Creature_ID,
        MeatEater.Creature_ID,
        Mushroom.Creature_ID
    ];
    for (let y = 0; y < rows; y++) {
        matrix.push([])
        for (let x = 0; x < columns; x++) {
            const randomValue = Math.floor(random(0, 3.1))
            const creatureType = creatureTypes[randomValue];            
            matrix[y][x] = creatureType
        }
    }
}



/*
function clickHandler(evt){
    clickCount++;
    console.log(evt);
    let str = "Thanks for clicking " + clickCount;
    this.innerText = str;
}
function setup (){
    createCanvas(500, 500)
    background("red")
}

let p = document.getElementById(".pElement")

if (typeof document !== 'undefined') {
    let element = document.querySelector('.pElement')
}

p.addEventListener("click", clickHandler);

function bodyClick(evt){
    console.log("Clicked at X: " + evt.pageX + ", Y: " + evt.pageY)
}

const my8tn = document.getElementById("send_btn") 
function btnCallback(){
    alert("Hello There")
}
 
function loadCallback(){
    alert("Ka-Bomb!")
}
 
function keyCallback(evt){
    console.log(evt)
}

//my8tn.onclick = btnCallback
my8tn.addEventListener("click", btnCallback)
window.onload = loadCallback
window.onkeydown = keyCallback
window.onclick = bodyClick

*/
server.listen(3000, function(){
    console.log("Server ist gestartet und hört auf Port 3000")
})


io.on("connection", function(socket){
    console.log("ws connection established ...", io.engine.clientsCount)
    socket.emit("send matrix", matrix)

    /*
    io.sockets
    initGame()
    setInterval(function(){
        updateGame()
        console.log("Updating Game ...")
    }, 1000)
  */
})