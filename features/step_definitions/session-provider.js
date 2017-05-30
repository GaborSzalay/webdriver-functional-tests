const {newSession} = require('w3c-webdriver');

let session;

async function start() {
    session = await newSession('http://localhost:9515', {
        browserName: 'Chrome'
    })
}

async function stop() {
    await session.delete();
}

function get () {
    return session;
};

module.exports = {
    start,
    stop,
    get
};