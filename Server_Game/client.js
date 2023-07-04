const side = 10
const fr = 10
let matrix = [[]];
/*
matrix.clear = (row, column) => {
    matrix[column][row] = 0
}
matrix.place = (row, column, creature) => {
    matrix[column][row] = creature
}
*/

function main(){
    const socket = io()

    function openMatrix(matrixUpdate){
        const mustReset = matrix.length != matrixUpdate.length || matrix[0].length != matrixUpdate[0].length;
        matrix = matrixUpdate
        if (mustReset)
        {
            resizeCanvas(side * matrix[0].length + 1, side * matrix.length + 1);
        }

        console.log(matrix[0].length, matrix.length);
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
            }else if(cell== 1 /*Grass.Creature_ID*/){
                fill("green")
            }else if(cell== 2 /*GrassEater.Creature_ID*/){
                fill("yellow")
            }else if(cell== 3 /*MeatEater.Creature_ID*/){
                fill("red")
            }else if(cell== 4 /*Mushroom.Creature_ID*/){
                fill("purple")
            }else if(cell== 5 /*EverythingEater.Creature_ID*/){
                fill("black")
            }else if(cell== 6){
                fill("brown")
            }
            rect(width * side, height * side, side, side)
        }
    }
}

let p = document.getElementById(".pElement")

function clickHandler(evt){
    clickCount++;
    console.log(evt);
    let str = "Thanks for clicking " + clickCount;
    this.innerText = str;
}

p.addEventListener('click', clickHandler);

if (typeof document == 'null') {
    let element = document.querySelector('.pElement')
    element.addEventListener("click", clickHandler);
}else{
    p.addEventListener("click", clickHandler);
}


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

my8tn.onclick = btnCallback
//my8tn.addEventListener('click', btnCallback)
window.onload = loadCallback
window.onkeydown = keyCallback
window.onclick = bodyClick


main()