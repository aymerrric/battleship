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
    let dom_manipulator;

    function setDomManipulator(DOMManipulator) {
        dom_manipulator = DOMManipulator;
    }

    const boatLength = [5, 4, 3, 3];
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
            let attempt = 0;
            const MAX_ATTEMP = 5;
            while (placed === 0 && attempt < MAX_ATTEMP) {
                const orientation = await getOrientation();
                const coordinates = await getCoordinates();
                console.log(orientation);
                console.log(coordinates);
                placed = player.gameboard.createShip(
                    coordinates,
                    orientation,
                    length
                );
                if (placed === 0) {
                    Logger.log("Invalid placement");
                }
                attempt++;
            }
            if (placed === 0) {
                throw new Error("Please make the boats placed well");
            } else {
                dom_manipulator.displayYourField();
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

    return {
        createPlayer,
        playTurn,
        getPlayer,
        startTheGame,
        setDomManipulator
    };
})();

export default GameLogic;
