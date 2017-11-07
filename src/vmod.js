'use strict';

const oget = require('oget');
const Script = require('vm').Script;
const requireLike = require('require-like');
const shortid = require('shortid').generate;
const dirname = require('path').dirname;

module.exports = (code, _sandbox) => {
    const filename = oget(
        module,
        'parent.filename',
        __filename
    ) + `.${shortid()}.__virtual__`;

    const sandbox = {
        require: requireLike(filename),
        exports: {},
        __filename: filename,
        __dirname: dirname(filename),
        process,
        Buffer,
        clearImmediate,
        clearInterval,
        clearTimeout,
        setImmediate,
        setInterval,
        setTimeout,
        console,
        ..._sandbox
    };

    sandbox.module = {
        exports: sandbox.exports,
        require: sandbox.require,
        id: filename,
        filename,
        parent: undefined
    };

    sandbox.global = sandbox;

    const opts = {
        filename,
        displayErrors: true
    };

    const script = new Script(code, opts);
    script.runInNewContext(sandbox, opts);

    return sandbox.module.exports;
};
