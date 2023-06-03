class Creature{
    constructor(x, y){
        this.x = x
        this.y = y
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
        ]
    }

    chooseCell(symbol){
        let found = []
        for (let i = 0; i < this.neighbors.length; i++){
            const pos = this.neighbors[i]
            let posX = pos[0]
            let posY = pos[1]
            if (posX >= 0 && posX < matrix[0].length && posY >= 0 && posY < matrix.length){
                let wert = matrix[posY][posX]
                if (wert == symbol){
                    found.push(pos)
                }
            }
        }
        return found
    }

    updateNeighbors(){
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
        ]
    }
}

class Grass extends Creature{
    static Creature_ID = 1
    static roundsBeforeMultiply = 6
    constructor(x,y){
        this.color = 1
        this.rounds_G = Math.floor(random(0, Grass.roundsBeforeMultiply))
    }

    multiply(){
        this.rounds_G++
        if (this.rounds_G < Grass.roundsBeforeMultiply) return;
        this.rounds_G = 0

        let emptyfields = this.chooseCell(0)
        if (emptyfields.length > 0){
            let theChosenField = random(emptyfields)
            let chosenX = theChosenField[0]
            let chosenY = theChosenField[1]
            let grassOBJ = new Grass(chosenX, chosenY)
            grassArr.push(grassOBJ)
            matrix.place(chosenX, chosenY, Grass.Creature_ID)
        }
    }

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class GrassEater extends Creature{
    static Creature_ID = 2
    static roundsBeforeMultiply = 6
    constructor(x, y){
        this.color = 2
        this.eatCounter = 0
        this.noteatCounter = 0
        this.rounds_GE = Math.floor(random(0, GrassEater.roundsBeforeMultiply))
    }

    move(){
        let emptyfields = this.chooseCell(0)
        if (emptyfields.length > 0){
            let newPos = random(emptyfields)
            let newX = newPos[0]
            let newY = newPos[1]
            matrix[newY][newX] = GrassEater.Creature_ID
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }

    eat(){
        this.rounds_GE++
        if (this.rounds_GE < GrassEater.roundsBeforeMultiply) return;
        this.rounds_GE = 0

        let grassFields = this.chooseCell(Grass.Creature_ID)
        if(grassFields.length > 0){
            const [row, column] = random(grassFields)
            matrix.place(row, column, GrassEater.Creature_ID)
            matrix.clear(this.x, this.y)
            this.x = row
            this.y = column
            this.eatCounter++
            for (let i = 0; i < grassArr.length; i++) {
                const grassOBJ = grassArr [i];
                if(grassOBJ.x == this.x && grassOBJ.y == this.y){
                    grassArr.splice(i, 1)
                }
            }
        }else{
            this.move()
            this.demise()
            this.noteatCounter++
        }
    }

    demise(){
        if(this.noteatCounter > 5){
            matrix[this.y][this.x] = 0
            for (let i = 0; i < grassEaterArr.length; i++) {
                const grassEaterOBJ = grassEaterArr [i];
                if(grassEaterOBJ.x == this.x && grassEaterOBJ.y == this.y){
                    grassEaterArr.splice(i, 1)
                }
                
            }
        }

    }

    multiply(){
        if (this.eatCounter > 5){
            let emptyfields = this.chooseCell(0)
            if (emptyfields.length > 0){
                let theChosenField = random(emptyfields)
                let chosenX = theChosenField[0]
                let chosenY = theChosenField[1]
                let grassEaterOBJ = new GrassEater(chosenX, chosenY)
                grassEaterArr.push(grassEaterOBJ)
                matrix.place(chosenX, chosenY, GrassEater.Creature_ID)
            }
            this.eatCounter = 0
        }
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class MeatEater extends Creature{
    static Creature_ID = 3
    constructor(x, y){
        this.eatenCounter = 0
        this.notEatenCounter = 0
        this.rounds_ME = 0
    }

    move(){
        let emptyfields = this.chooseCell(0)
        if (emptyfields.length > 0){
            let newPos = random(emptyfields)
            let newX = newPos[0]
            let newY = newPos[1]
            matrix[newY][newX] = MeatEater.Creature_ID
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }

    eat(){
        this.rounds_ME++
        if (this.rounds_ME < 9) return;
        this.rounds_ME = 0
        let grassEaterFields = this.chooseCell(GrassEater.Creature_ID)
        if(grassEaterFields.length > 0){
            let newPos = random(grassEaterFields)
            let newX = newPos[0]
            let newY = newPos[1]
            matrix[newY][newX] = MeatEater.Creature_ID
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            this.eatenCounter++
            for (let i = 0; i < grassEaterArr.length; i++) {
                const grassEaterOBJ = grassEaterArr [i];
                if(grassEaterOBJ.x == this.x && grassEaterOBJ.y == this.y){
                    grassEaterArr.splice(i, 1)
                }
            }
        }else{
            this.move()
            this.demise()
            this.notEatenCounter++
        }
    }

    demise(){
        if(this.notEatenCounter >= 8){
            matrix[this.y][this.x] = 0
            for (let i = 0; i < meatEaterArr.length; i++) {
                const meatEaterOBJ = meatEaterArr [i];
                if(meatEaterOBJ.x == this.x && meatEaterOBJ.y == this.y){
                    meatEaterArr.splice(i, 1)
                }
                
            }
        }

    }

    multiply(){
        if (this.eatenCounter > 10){
            let emptyfields = this.chooseCell(0)
            if (emptyfields.length > 0){
                let theChosenField = random(emptyfields)
                let newX = theChosenField[0]
                let newY = theChosenField[1]
                let meatEaterOBJ = new MeatEater(newX, newY)
                meatEaterArr.push(meatEaterOBJ)
                matrix[newY][newX] = MeatEater.Creature_ID
            }
        }
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Mushroom extends Creature{
    static Creature_ID = 4
    constructor(x, y){
        this.grassRespawnedCounter = 0
        this.rounds_M = 0
    }

    demise(){
        matrix[this.y][this.x] = EverythingEater.Creature_ID
        const everythingEater = new EverythingEater(this.x, this.y)
        everythingEaterArr.push(everythingEater)
        for (let i = 0; i < mushroomArr.length; i++) {
            const mushroom = mushroomArr[i];
            if(mushroom.x == this.x && mushroom.y == this.y){
                mushroomArr.splice(i, 1)
            }
        }
    }

    respawnGrass(){
        if (grassEaterArr.length > 0) return

        this.updateNeighbors()
        let emptyfields = this.chooseCell(0)
        if (emptyfields.length > 0){
            const [x, y] = random(emptyfields)
            let grass = new Grass(x, y)
            grassArr.push(grass)
            matrix.place(x, y, Grass.Creature_ID)
            this.grassRespawnedCounter++
            if (this.grassRespawnedCounter > 3){
                this.demise()
            }
        }
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class EverythingEater extends Creature{
    static Creature_ID = 5
    constructor(x, y){
        this.eatenCounter = 0
        this.notEatenCounter = 0
        this.rounds_EE = 0
    }

    move(){
        const movementCell = [0, 6]
        let emptyfields = this.chooseCell(movementCell)
        if (emptyfields.length > 0){
            let newPos = random(emptyfields)
            let newX = newPos[0]
            let newY = newPos[1]
            matrix[newY][newX] = EverythingEater.Creature_ID
            matrix[this.y][this.x] = 6
            this.x = newX
            this.y = newY
        }
    }

    eat(){
        this.rounds_EE++
        if (this.rounds_EE < 3) return;
        this.rounds_EE = 0

        const food = [Grass.Creature_ID, GrassEater.Creature_ID, MeatEater.Creature_ID]
        const everythingEaterFields = this.chooseCell(food)
        if(everythingEaterFields.length == 0) {
            this.move()
            this.demise()
            this.notEatenCounter++
            return
        }

        const newPos = random(everythingEaterFields)
        const newX = newPos[0]
        const newY = newPos[1]
        matrix[newY][newX] = EverythingEater.Creature_ID
        matrix[this.y][this.x] = 6
        this.x = newX
        this.y = newY
        this.eatenCounter++
        for (let i = 0; i < grassArr.length; i++) {
            const grassOBJ = grassArr [i];
            if(grassOBJ.x == this.x && grassOBJ.y == this.y){
                grassArr.splice(i, 1)
            }
        }
        for (let i = 0; i < grassEaterArr.length; i++) {
            const grassEaterOBJ = grassEaterArr [i];
            if(grassEaterOBJ.x == this.x && grassEaterOBJ.y == this.y){
                grassEaterArr.splice(i, 1)
            }
        }
        for (let i = 0; i < meatEaterArr.length; i++) {
            const meatEaterOBJ = meatEaterArr [i];
            if(meatEaterOBJ.x == this.x && meatEaterOBJ.y == this.y){
                meatEaterArr.splice(i, 1)
            }
        }
    }

    demise(){
        if(this.notEatenCounter >= 10){
            matrix[this.y][this.x] = 6
            for (let i = 0; i < everythingEaterArr.length; i++) {
                const everythingEaterOBJ = everythingEaterArr [i];
                if(everythingEaterOBJ.x == this.x && everythingEaterOBJ.y == this.y){
                    everythingEaterArr.splice(i, 1)
                }  
            }
        }
    }
}