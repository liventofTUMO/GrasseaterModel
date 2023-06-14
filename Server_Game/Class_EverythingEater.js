const livingCreature = require("./Class_LivingCreature")
module.exports = class EverythingEater extends livingCreature{
    static Creature_ID = 5
    constructor(x, y){
        super(x,y)
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