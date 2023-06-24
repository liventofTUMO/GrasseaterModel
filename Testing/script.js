let clickCount = 0;
function clickHandler(evt){
   clickCount++;
   console.log(evt);
   let str = "Thanks for clicking " + clickCount;
   this.innerText = str;
}

let p = document.getElementById("pElement");p.addEventListener("click", clickHandler);