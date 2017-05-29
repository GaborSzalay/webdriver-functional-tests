let session;

function store(_session) {
    session = _session;
};

function get () {
    return session;
};

module.exports = {
    store,
    get
};