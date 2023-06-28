 let matrix = [
    [1,0,0,0,1,0,0,1,1,1,0],
    [1,0,0,0,1,0,0,1,1,1,0],
    [1,0,0,0,1,0,0,1,1,1,0],
    [1,0,0,0,1,0,0,1,1,1,0],
    [1,0,0,0,1,0,0,1,1,1,0],
    [1,0,0,0,1,0,0,1,1,1,0]
]
const side = 50
const fr = 10

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