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
app.get("/", function (req, res) {
    res.redirect("client.html")
})

const newMatrix = () => {
    const matrix = []

    matrix.clear = (row, column) => {
        game.matrix[column][row] = 0;
    };

    matrix.place = (row, column, creature) => {
        matrix[column][row] = creature
    };

    return matrix;
};

game = {
    matrix: newMatrix(),
    grassArr: [],
    grassEaterArr: [],
    meatEaterArr: [],
    mushroomArr: [],
    everythingEaterArr: [],
};

randomEntry = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

function placeRandomMushroom() {
    const raY = Math.floor(Math.random() * game.matrix.length);
    const raX = Math.floor(Math.random() * game.matrix[0].length);
    game.matrix[raY][raX] = Mushroom.Creature_ID
}


function initGame() {
    configureMatrix(35, 35)
    const { matrix, grassArr, grassEaterArr, meatEaterArr, mushroomArr, everythingEaterArr } = game;

    placeRandomMushroom()
    for (let column = 0; column < matrix.length; column++) {
        for (let row = 0; row < matrix[column].length; row++) {
            const creatureType = matrix[column][row]
            if (creatureType == Grass.Creature_ID) {
                const grass = new Grass(row, column)
                grassArr.push(grass)
            } else if (creatureType == GrassEater.Creature_ID) {
                const grassEater = new GrassEater(row, column)
                grassEaterArr.push(grassEater)
            } else if (creatureType == MeatEater.Creature_ID) {
                const meatEater = new MeatEater(row, column)
                meatEaterArr.push(meatEater)
            } else if (creatureType == Mushroom.Creature_ID) {
                const mushroom = new Mushroom(row, column)
                mushroomArr.push(mushroom)
            } else if (creatureType == EverythingEater.Creature_ID) {
                const everythingEater = new EverythingEater(row, column)
                everythingEaterArr.push(everythingEater)
            }
        }
    }
}


function updateGame() {
    const { matrix, grassArr, grassEaterArr, meatEaterArr, mushroomArr, everythingEaterArr } = game;

    for (grass of grassArr) {
        grass.multiply()
    }
    for (grassEater of grassEaterArr) {
        grassEater.eat()
        grassEater.multiply()
    }
    for (meatEater of meatEaterArr) {
        meatEater.eat()
    }
    for (mushroom of mushroomArr) {
        mushroom.respawnGrass()
    }
    for (everythingEater of everythingEaterArr) {
        everythingEater.eat()
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
    const matrix = newMatrix();
    for (let y = 0; y < rows; y++) {
        matrix.push([])
        for (let x = 0; x < columns; x++) {
            const randomValue = Math.floor(Math.random() * 3)
            const creatureType = creatureTypes[randomValue];
            matrix[y][x] = creatureType
        }
    }
    game.matrix = matrix;
}

server.listen(3000, function () {
    console.log("Server ist gestartet und hört auf Port 3000")
})

io.on("connection", function (socket) {
    console.log("ws connection established ...", io.engine.clientsCount)

    if (io.engine.clientsCount === 1) {
        initGame()
        setInterval(function () {
            updateGame()
            const { matrix } = game;
            // console.log("Updating Game ...")
            socket.emit("send matrix", matrix)
        }, 150)
    }
})