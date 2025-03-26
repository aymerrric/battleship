import Ship from "./src/ship";
import Gameboard from "./src/gameboard";

test("Ship class (hit method)", () => {
    const ship = new Ship(4);
    ship.hit();
    expect(ship.getHits()).toBe(1);
});

test("Ship class (hit method)", () => {
    const ship = new Ship(4);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.getHits()).toBe(3);
});

test("Ship class (isSunk method)", () => {
    const ship = new Ship(0);
    expect(ship.isSunk()).toBe(true);
});

test("Gameboard class (isValidPlace method) without ship placed", () => {
    const gameboard = new Gameboard();
    expect(gameboard.isValidPlace([0, 0], "top", 4)).toBe(false);
    expect(gameboard.isValidPlace([0, 0], "bottom", 1)).toBe(true);
    expect(gameboard.isValidPlace([0, 0], "bottom", 2)).toBe(true);
});

test("Gameboard class (isValidPlace method) with ship placed", () => {
    const gameboard = new Gameboard();
    gameboard.createShip([0, 0], "bottom", 5);
    expect(gameboard.isValidPlace([0, 0], "bottom", 1)).toBe(false);
    expect(gameboard.isValidPlace([0, 1], "bottom", 2)).toBe(false);
});

test("Gameboard class (createShip method) 1", () => {
    const gameboard = new Gameboard();
    gameboard.createShip([0, 0], "bottom", 5);
    gameboard.createShip([1, 0], "right", 2);
    let state = gameboard.boatsState();
    expect(state.total).toBe(2);
    expect(state.alive).toBe(2);
});

test("Gameboard class (createShip Method) test the actualisation of the ships", () => {
    const gameboard = new Gameboard();
    gameboard.createShip([0, 0], "bottom", 5);
    const ships = gameboard.ships;
    expect(ships.get(1).length).toBe(5);
});
