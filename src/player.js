import Gameboard from "./gameboard";

class Player {
    gameboard = new Gameboard();

    #touchedCases = [];
    #attackedCases = [];

    defineEnemy(enemy) {
        // enemy should be another player
        this.enemy = enemy;
    }

    attackEnemy(coordinates) {
        if (!this.enemy) {
            throw new Error("You need an ennemy before attacking");
        }

        const [x, y] = coordinates;
        if (x < 0 || x > 9 || y < 0 || y > 9) {
            throw new Error("Your input is out of field");
        }
        // here one know that the input is ok
        const newHit = this.enemy.gameboard.receiveAttack(coordinates);
        if (newHit) {
            this.#touchedCases.push(coordinates);
        }
        if (!this.#attackedCases.includes(coordinates)) {
            this.#attackedCases.push(coordinates);
        }
    }

    displayTouchedCases() {
        return this.#touchedCases;
    }

    displayAttackedCases() {
        return this.#attackedCases;
    }

    isStillAlive() {
        const { alive } = this.gameboard.boatsState();

        return alive !== 0;
    }
}

class ComputerPlayer extends Player {
    constructor() {
        super();
    }
    play() {
        // attack randomly
        while (true) {
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            if (!this.displayAttackedCases().includes([x, y])) {
                this.attackEnemy([x, y]);
                break;
            }
        }
    }
}

export { ComputerPlayer };
export default Player;
