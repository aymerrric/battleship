const Logger = (function () {
    function log(message) {
        console.log(message);
    }

    return { log };
})();

export default Logger;
