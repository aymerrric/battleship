import Player from "./player";
import GameLogic from "./gamelogic";

const DOMManipulator = function (player1, player2) {
    const Player1 = player1;
    const Player2 = player2;

    const titleField = document.querySelector("#title");

    function displayYourField() {
        resetDisplay();
        const yourField = Player1.gameboard.renderField(); // table array of array 10 * 10 0 if water and number if boat render
        yourField.forEach((row, rowIndex) => {
            row.forEach((cellvalue, columnIndex) => {
                const cell = document.querySelector(
                    `#id${columnIndex}-${rowIndex}`
                );
                if (cellvalue !== 0) {
                    cell.classList.add("boat");
                }
            });
        });
        const attackedCases = Player1.gameboard.renderAttackedCases();
        attackedCases.forEach(coordinate => {
            const [x, y] = coordinate;
            const cell = document.querySelector(`#id${x}-${y}`);
            cell.classList.add("attacked");
        });
    }

    function resetDisplay() {
        const tds = document.querySelectorAll("td");
        Array.from(tds).forEach(node => {
            node.classList.remove("boat");
            node.classList.remove("attacked");
        });
    }

    function displayAdversaryField() {
        // Should display all the cases you attacked with an indication if they were a boat or not
        resetDisplay();
        Player1.displayAttackedCases().forEach(coordinates => {
            const [x, y] = coordinates;
            const cell = document.querySelector(`#id${x}-${y}`);
            cell.classList.add("attacked");
        });
        Player1.displayTouchedCases().forEach(coordinates => {
            const [x, y] = coordinates;

            const cell = document.querySelector(`#id${x}-${y}`);
            cell.classList.add("boat");
        });
    }

    document.querySelector("table").addEventListener("click", event => {
        const cell = event.target;
        const cellID = cell.getAttribute("id");
        if (cellID) {
            const x = cellID[2];
            const y = cellID[4];
            GameLogic.playTurn([x, y]);
        }
        if (titleField.textContent === "Your Field") {
            displayYourField();
        } else {
            displayAdversaryField();
        }
    });

    document.querySelector("#your-field").addEventListener("click", () => {
        displayYourField();
        titleField.textContent = "Your Field";
    });
    document.querySelector("#opposite-field").addEventListener("click", () => {
        displayAdversaryField();
        titleField.textContent = "Your Enemy's Field";
    });

    return { displayYourField, displayAdversaryField };
};

export default DOMManipulator;
