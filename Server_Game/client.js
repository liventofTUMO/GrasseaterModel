/*
let clickCount = 0
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

my8tn.onclick = btnCallback
//my8tn.addEventListener("click", btnCallback)
window.onload = loadCallback
window.onkeydown = keyCallback
window.onclick = bodyClick
*/