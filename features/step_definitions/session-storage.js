let session;

function create(_session) {
    session = _session;
};

function get () {
    return session;
};

module.exports = {
    create,
    get
};