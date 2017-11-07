'use strict';

var oget = require('oget');
var Script = require('vm').Script;
var requireLike = require('require-like');
var shortid = require('shortid').generate;
var dirname = require('path').dirname;

module.exports = function (code, _sandbox) {
    var filename = oget(
        module,
        'parent.filename',
        __filename
    ) + "." + (shortid()) + ".__virtual__";

    var sandbox = Object.assign({}, {require: requireLike(filename),
        exports: {},
        __filename: filename,
        __dirname: dirname(filename),
        process: process,
        Buffer: Buffer,
        clearImmediate: clearImmediate,
        clearInterval: clearInterval,
        clearTimeout: clearTimeout,
        setImmediate: setImmediate,
        setInterval: setInterval,
        setTimeout: setTimeout,
        console: console},
        _sandbox);

    sandbox.module = {
        exports: sandbox.exports,
        require: sandbox.require,
        id: filename,
        filename: filename,
        parent: undefined
    };

    sandbox.global = sandbox;

    var opts = {
        filename: filename,
        displayErrors: true
    };

    var script = new Script(code, opts);
    script.runInNewContext(sandbox, opts);

    return sandbox.module.exports;
};
