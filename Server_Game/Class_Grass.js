const LivingCreature = require("./Class_LivingCreature");

module.exports = class Grass extends LivingCreature{
    static Creature_ID = 1
    static roundsBeforeMultiply = 10
    constructor(x,y){
        super(x,y)
        this.color = 1
        this.rounds_G = Math.floor(Math.random() *Grass.roundsBeforeMultiply)
    }

    multiply(){
        this.rounds_G++
        if (this.rounds_G < Grass.roundsBeforeMultiply) return;
        
        this.rounds_G = 0
        const emptyFields = this.chooseCell(0)
        if (emptyFields.length == 0) return;

        const { grassArr, matrix } = game;
        let theChosenField = randomEntry(emptyFields);
        let [chosenX, chosenY] = theChosenField;
        let grassOBJ = new Grass(chosenX, chosenY)
        grassArr.push(grassOBJ)
        matrix.place(chosenX, chosenY, Grass.Creature_ID)
    }
}