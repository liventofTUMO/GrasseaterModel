module.exports = class Square {
    constructor(side) {
        this.side = side
    }
    getArea() {
        return this.side * this.side
    }
}
