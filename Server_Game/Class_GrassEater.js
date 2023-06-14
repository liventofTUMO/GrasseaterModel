const LivingCreature = require("./Class_LivingCreature")
class GrassEater extends LivingCreature{
    static Creature_ID = 2
    static roundsBeforeMultiply = 6
    constructor(x, y){
        super(x,y)
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
        if (this.eatCounter > 1){
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