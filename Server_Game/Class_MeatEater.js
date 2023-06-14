const LivingCreature = require("./Class_LivingCreature")
class MeatEater extends LivingCreature{
    static Creature_ID = 3
    constructor(x, y){
        super(x,y)
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
        if (this.eatenCounter > 4){
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