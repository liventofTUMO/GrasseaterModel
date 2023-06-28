module.exports = class LivingCreature{
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
            let [posX, posY] = this.neighbors[i];
            const { matrix } = game;
            if (posX >= 0 && posX < matrix[0].length && posY >= 0 && posY < matrix.length){
                let wert = matrix[posY][posX]
                if (wert == symbol){
                    found.push([posX, posY])
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