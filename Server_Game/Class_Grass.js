const LivingCreature = require("./Class_LivingCreature")
module.exports = class Grass extends LivingCreature{
    static Creature_ID = 1
    static roundsBeforeMultiply = 10
    constructor(x,y){
        super(x,y)
        this.color = 1
        //this.rounds_G = Math.floor(random(0, Grass.roundsBeforeMultiply))
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