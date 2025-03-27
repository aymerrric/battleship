function getRandomOrientation() {
    const number = Math.floor(Math.random() * 4);
    if (number === 0) {
        return "top";
    } else if (number === 1) {
        return "right";
    } else if (number === 2) {
        return "bottom";
    } else {
        return "left";
    }
}

function getRandomCordinates() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
}

function getCoordinates() {
    const x = parseInt(prompt("x coordinate:"));
    const y = parseInt(prompt("y coordinate:"));
    return Promise.resolve([x, y]);
}

function getOrientation() {
    const orientation = prompt("Orientation: ");
    return Promise.resolve(orientation);
}

export {
    getRandomOrientation,
    getRandomCordinates,
    getCoordinates,
    getOrientation
};
