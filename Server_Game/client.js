const side = 50
const fr = 10
let matrix = [
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

function main(){
    const socket = io()

    function openMatrix(matrixData){
        matrix = matrixData
        drawMatrix()
    }
    socket.on("send matrix", openMatrix)
}

function setup(){
    createCanvas(side * matrix[0].length + 1, side * matrix.length + 1)
    background("#acacac")
    frameRate(fr)
}

/*
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
*/

function drawMatrix(columns, rows) {
    for(let height = 0; height < matrix.length; height ++){
        const row = matrix[height];
        for(let width = 0; width < row.length; width++){
            const cell = row[width];
            if(cell== 0){
                fill("white")
            }else if(cell== 1/*Grass.Creature_ID*/){
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

main()