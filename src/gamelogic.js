import Logger from "./logger";
import Player from "./player";
import { ComputerPlayer } from "./player";
import {
    getRandomOrientation,
    getRandomCordinates,
    getOrientation,
    getCoordinates
} from "./utils";

const GameLogic = (function () {
    const boatLength = [5];
    let Player1;
    let Player2;

    function createPlayer() {
        Player1 = new Player();
        Player2 = new ComputerPlayer();
        Player1.defineEnemy(Player2);
        Player2.defineEnemy(Player1);
    }

    function getPlayer() {
        return { Player1, Player2 };
    }

    function startTheGame() {
        placeChosenBoats(Player1);
        placeBoatsRandomly(Player2);
    }

    async function placeChosenBoats(player) {
        for (length of boatLength) {
            let placed = 0;
            while (placed === 0) {
                const orientation = await getOrientation();
                const coordinates = await getCoordinates();
                console.log(orientation);
                console.log(coordinates);
                placed = player.gameboard.createShip(
                    coordinates,
                    orientation,
                    length
                );
            }
        }
    }

    function placeBoatsRandomly(player) {
        for (let length of boatLength) {
            let placed = 0;
            while (placed === 0) {
                const orientation = getRandomOrientation();
                const coordinates = getRandomCordinates();
                placed = player.gameboard.createShip(
                    coordinates,
                    orientation,
                    length
                );
            }
        }
    }
    function checkPlayerWin(player) {
        // Verify if player1Win
        return !player.enemy.isStillAlive();
    }

    function playTurn(coordinates) {
        Player1.attackEnemy(coordinates);
        if (checkPlayerWin(Player1)) {
            Logger.displayWin("You");
        } else {
            Player2.play();
            if (checkPlayerWin(Player2)) {
                Logger.displayWin("The computer");
            }
        }
    }

    return { createPlayer, playTurn, getPlayer, startTheGame };
})();

export default GameLogic;
