// Here a GameBoard means one field like the place where a player can put his boats
import Ship from "./ship";
import Logger from "./logger";

class Gameboard {
    #numberOfBoatAlived = 0;
    #numberOfBoat = 0;
    // the field is a table where a case is 0 if full of water, and get a boat number otherwise
    #field = new Array(10).fill(null).map(() => new Array(10).fill(0));
    #attacked = [];
    constructor() {
        this.#numberOfBoat = 0;
        this.ships = new Map();
    }
    createShip(coordinates, orientation, length) {
        // must test if ship can be placed
        if (!this.isValidPlace(coordinates, orientation, length)) {
            return 0;
        }
        // Create the ship, update the counter and update the field
        const ship = new Ship(length);
        const shipNumber = ++this.#numberOfBoat;
        this.ships.set(shipNumber, ship);
        this.placeShip(coordinates, orientation, length, shipNumber);
        if (length >= 1) {
            this.#numberOfBoatAlived++;
        }
        return 1;
    }

    isValidPlace(coordinates, orientation, length) {
        const [x, y] = coordinates;
        if (x < 0 || x > 9 || y < 0 || y > 9) {
            return false;
        }
        switch (orientation) {
            case "bottom":
                if (y + length - 1 >= 10) {
                    return false;
                }
                for (
                    let coordinate = y;
                    coordinate <= y + length - 1;
                    coordinate++
                ) {
                    if (this.#field[coordinate][x] !== 0) {
                        return false;
                    }
                }
                break;

            case "top":
                if (y - length + 1 < 0) {
                    return false;
                }
                for (
                    let coordinate = y;
                    coordinate >= y - length + 1;
                    coordinate--
                ) {
                    if (this.#field[coordinate][x] !== 0) {
                        return false;
                    }
                }
                break;

            case "left":
                if (x - length + 1 < 0) {
                    return false;
                }
                for (
                    let coordinate = x;
                    coordinate >= x - length + 1;
                    coordinate--
                ) {
                    if (this.#field[y][coordinate] !== 0) {
                        return false;
                    }
                }
                break;

            case "right":
                if (x + length - 1 > 9) {
                    return false;
                }
                for (
                    let coordinate = x;
                    coordinate <= x + length - 1;
                    coordinate++
                ) {
                    if (this.#field[y][coordinate] !== 0) {
                        return false;
                    }
                }
                break;
        }
        return true;
    }

    placeShip(coordinates, orientation, length, shipNumber) {
        const [x, y] = coordinates;
        switch (orientation) {
            case "bottom":
                for (
                    let coordinate = y;
                    coordinate <= y + length - 1;
                    coordinate++
                ) {
                    this.#field[coordinate][x] = shipNumber;
                }
                break;

            case "top":
                for (
                    let coordinate = y;
                    coordinate >= y - length + 1;
                    coordinate--
                ) {
                    this.#field[coordinate][x] = shipNumber;
                }
                break;

            case "left":
                for (
                    let coordinate = x;
                    coordinate >= x - length + 1;
                    coordinate--
                ) {
                    this.#field[y][coordinate] = shipNumber;
                }
                break;

            case "right":
                for (
                    let coordinate = x;
                    coordinate <= x + length - 1;
                    coordinate++
                ) {
                    this.#field[y][coordinate] = shipNumber;
                }
                break;
        }
    }
    boatsState() {
        return { total: this.#numberOfBoat, alive: this.#numberOfBoatAlived };
    }
    receiveAttack(coordinates) {
        // return 0 if nothing was touched 1 otherwise
        const [x, y] = coordinates;
        if (x < 0 || x > 9 || y < 0 || y > 9) {
            throw new Error("The attacked case is out of the gameboard");
        }
        if (this.#attacked.includes(coordinates)) {
            Logger.log("The case was already hit");
            return 0;
        }
        // The case is in the gameBoard and was not already hit
        if (this.#field[y][x] === 0) {
            Logger.log("In the water");
            this.#attacked.push([x, y]);
            return 0;
        } else {
            const shipHitNumber = this.#field[y][x];
            const ship = this.ships.get(shipHitNumber);
            ship.getHits();
            Logger.log("A ship has been hit");
            if (ship.isSunk()) {
                this.#numberOfBoatAlived--;
                Logger.log("A ship has been sunk");
            }
            this.#attacked.push([x, y]);
            return 1;
        }
    }
    renderField() {
        return this.#field;
    }

    renderAttackedCases() {
        return this.#attacked;
    }
}

export default Gameboard;
