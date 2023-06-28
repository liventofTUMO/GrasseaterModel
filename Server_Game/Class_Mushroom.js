const LivingCreature = require("./Class_LivingCreature")
const EverythingEater = require("./Class_EverythingEater")
module.exports = class Mushroom extends LivingCreature{
    static Creature_ID = 4
    constructor(x, y){
        super(x,y)
        this.grassRespawnedCounter = 0
        this.rounds_M = 0
    }

    demise(){
        const { matrix, everythingEaterArr, mushroomArr } = game;
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
        const { matrix, grassEaterArr, grassArr} = game
        if (grassEaterArr.length > 0) return

        this.updateNeighbors()
        let emptyFields = this.chooseCell(0)
        if (emptyFields.length > 0){
            const [x, y] = randomEntry(emptyFields)
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