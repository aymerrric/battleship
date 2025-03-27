const Logger = (function () {
    function log(event) {
        console.log(event);
    }
    function displayWin(name) {
        console.log(`${name} win`);
    }

    return { log, displayWin };
})();

export default Logger;
