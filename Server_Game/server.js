const Grass = require("./Class_Grass")
const GrassEater = require("./Class_GrassEater")
const MeatEater = require("./Class_MeatEater")
const Mushroom = require("./Class_Mushroom")
const EverythingEater = require("./Class_EverythingEater")

const matrix = [];
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
            //const randomValue = Math.floor(random(0, 3.1))
            //const creatureType = creatureTypes[randomValue];            
            matrix[y][x] = creatureType
        }
    }
}

initGame()
//console.log(grassEaterArr)