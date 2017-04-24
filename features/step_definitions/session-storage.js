module.exports = (() => {
    let session = false;

    const create = (_session) => {
        session = _session;
    };

    const get = () => {
        return session;
    };

    return {
        create: create,
        get: get
    }
})();