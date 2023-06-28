const LivingCreature = require("./Class_LivingCreature")
const Grass = require("./Class_Grass")
module.exports = class GrassEater extends LivingCreature {
    static Creature_ID = 2
    static roundsBeforeMultiply = 6
    constructor(x, y) {
        super(x, y)
        this.color = 2
        this.eatCounter = 0
        this.notEatCounter = 0
        this.rounds_GE = Math.floor(Math.random() * GrassEater.roundsBeforeMultiply)
    }

    move() {
        const emptyFields = this.chooseCell(0)
        if (emptyFields.length == 0) return;

        const { matrix } = game;
        let newPos = randomEntry(emptyFields)
        let newX = newPos[0]
        let newY = newPos[1]
        matrix[newY][newX] = GrassEater.Creature_ID
        matrix[this.y][this.x] = 0
        this.x = newX
        this.y = newY
    }

    eat() {
        this.rounds_GE++
        if (this.rounds_GE < GrassEater.roundsBeforeMultiply) return;
        this.rounds_GE = 0

        let grassFields = this.chooseCell(Grass.Creature_ID)
        if (grassFields.length > 0) {
            const { matrix, grassArr } = game;
            const [row, column] = randomEntry(grassFields)
            matrix.place(row, column, GrassEater.Creature_ID)
            matrix.clear(this.x, this.y)
            this.x = row
            this.y = column
            this.eatCounter++
            for (let i = 0; i < grassArr.length; i++) {
                const grassOBJ = grassArr[i];
                if (grassOBJ.x == this.x && grassOBJ.y == this.y) {
                    grassArr.splice(i, 1)
                }
            }
        } else {
            this.move()
            this.demise()
            this.notEatCounter++
        }
    }

    demise() {
        if (this.notEatCounter > 5) {
            const { matrix, grassEaterArr } = game;
            matrix[this.y][this.x] = 0
            for (let i = 0; i < grassEaterArr.length; i++) {
                const grassEaterOBJ = grassEaterArr[i];
                if (grassEaterOBJ.x == this.x && grassEaterOBJ.y == this.y) {
                    grassEaterArr.splice(i, 1)
                }

            }
        }

    }

    multiply() {
        if (this.eatCounter <= 1) return;

        const { matrix, grassEaterArr } = game;
        let emptyFields = this.chooseCell(0)
        if (emptyFields.length > 0) {
            let [chosenX, chosenY] = randomEntry(emptyFields)
            let grassEaterOBJ = new GrassEater(chosenX, chosenY)
            grassEaterArr.push(grassEaterOBJ)
            matrix.place(chosenX, chosenY, GrassEater.Creature_ID)
        }
        this.eatCounter = 0
    }
}