let ws = null;

function send(camNo, command) {
    const myObj = {"CamNo":camNo, "command": command};
    const myJSON = JSON.stringify(myObj);
    console.log('Sending message ' + myJSON);
    ws.send(myJSON);
}

window.onload = function () {

    // redirect console.log
    (function () {
        const old = console.log;
        const logger = document.getElementById('log');
        console.log = function () {
            for (let i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'object') {
                    logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '<br />';
                } else {
                    logger.innerHTML += arguments[i] + '<br />';
                }
                old.apply(undefined, arguments);
            }
        }
    })();


    const url = 'ws://127.0.0.1:5678';

    console.log('Connecting to ' + url);

    ws = new WebSocket(url);

    // event emitted when connected
    ws.onopen = function () {
        console.log('websocket is connected ...');
    }

    // event emitted when receiving message
    // Possible commands - lens_calibrate, board_calibrate, start, stop, detected
    // Possible camera - 0, 1, 2, null
    // Possible results - success, fail, 20, 2x20, 3x20 ...
    ws.onmessage = function (ev) {
        const obj = JSON.parse(ev.data);
        console.log("Command received", "Received:" + obj.command, "Result:" + obj.result, "Camera:" + obj.camera);
    }

}