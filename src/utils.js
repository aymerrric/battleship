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
    return new Promise(resolve => {
        console.log("banane");
        const body = document.querySelector("body");
        const dialog = document.createElement("dialog");
        dialog.classList.add("orientation");
        const selector1 = document.createElement("div");
        const selector2 = document.createElement("div");
        const selector3 = document.createElement("div");
        const selector4 = document.createElement("div");
        const selectorContainer = document.createElement("div");
        selector1.classList.add("selector", "selector1");
        selector2.classList.add("selector", "selector2");
        selector3.classList.add("selector", "selector3");
        selector4.classList.add("selector", "selector4");
        selector1.addEventListener("click", () => {
            resolve("top");
            dialog.close();
            body.removeChild(dialog);
        });
        selector2.addEventListener("click", () => {
            resolve("left");
            dialog.close();
            body.removeChild(dialog);
        });
        selector3.addEventListener("click", () => {
            resolve("bottom");
            dialog.close();
            body.removeChild(dialog);
        });
        selector4.addEventListener("click", () => {
            resolve("right");
            dialog.close();
            body.removeChild(dialog);
        });
        selectorContainer.append(selector1, selector2, selector3, selector4);
        selectorContainer.classList.add("selector-container");
        dialog.append(selectorContainer);
        body.appendChild(dialog);
        dialog.showModal();
    });
}

export {
    getRandomOrientation,
    getRandomCordinates,
    getCoordinates,
    getOrientation
};
