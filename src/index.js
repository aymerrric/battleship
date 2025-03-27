require("./style.css");
import DOMManipulator from "./dom_manipulator";
import GameLogic from "./gamelogic";
import Player from "./player";

const PlayGame = function () {
    GameLogic.createPlayer();
    const { Player1, Player2 } = GameLogic.getPlayer();
    const ManageTheDOM = DOMManipulator(Player1, Player2);
    GameLogic.setDomManipulator(ManageTheDOM);
    GameLogic.startTheGame();
    ManageTheDOM.setEventListener();
    ManageTheDOM.displayYourField();
};

window.addEventListener("load", PlayGame);
