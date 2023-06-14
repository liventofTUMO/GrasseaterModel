function draw(){
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
