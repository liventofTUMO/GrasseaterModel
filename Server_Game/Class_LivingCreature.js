class LivingCreature{
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