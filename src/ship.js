class Ship {
    #hitsCounter = 0;
    #sunk = false;

    constructor(length) {
        this.length = length;
    }

    hit() {
        this.#hitsCounter++;
    }

    getHits() {
        return this.#hitsCounter;
    }

    isSunk() {
        this.#sunk = this.length - this.#hitsCounter > 0 ? false : true;
        return this.#sunk;
    }
}

export default Ship;
