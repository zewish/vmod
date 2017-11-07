'use strict';

var ref = require('chai');
var expect = ref.expect;
var should = ref.should;
should();

var vmod = require('./vmod');

describe('vmod.js', function () {
    it('exports a function', function () {
        vmod.should.be.a('function');
    });

    it('returns {}', function () {
        vmod('var a = "whatever";').should.be.eql({});
    });

    it('returns 1', function () {
        vmod('module.exports = 1;').should.be.equal(1);
    });

    it('returns a function', function () {
        var fn = vmod(
            'module.exports = () => "So internal!";'
        );

        expect(fn).to.be.a('function');
        expect(fn()).to.be.equal('So internal!');
    });

    it('throws an error', function () {
        expect(
            function () { return vmod(
                'console.log(bla);'
            ); }
        )
        .to.throw(
            'bla is not defined'
        );
    });

    it('throws an error', function () {
        expect(
            function () { return vmod(
                'console.log(bla);'
            ); }
        )
        .to.throw(
            'bla is not defined'
        );
    });

    it('sets proper virtual filename', function () {
        try {
            vmod(
                'console.log(bla);'
            );
        }
        catch (err) {
            expect(
                err.stack
                .split('\n')[0]
                .endsWith('__virtual__:1')
            )
            .to.be.true;
        }
    });

    it('sets custom sandbox', function () {
        var _sandbox = {
            require: null
        };

        var res = vmod(
            'module.exports = global;',
            _sandbox
        );

        expect(res.require)
        .to.be.null;
    });

    it('can require real files', function () {
        expect(
            vmod(
                'module.exports = require("./_test-file.js");'
            )
        )
        .to.equal('test file data');
    });

    it('sets proper __filename', function () {
        expect(
            vmod('module.exports = __filename')
            .endsWith('.__virtual__')
        )
        .to.be.true;
    });

    it('sets proper __dirname', function () {
        expect(
            vmod('module.exports = __dirname')
        )
        .to.be.equal(__dirname);
    });

    it('allows override of a sandbox variable', function () {
        var _sandbox = {
            require: null
        };

        expect(
            function () { return vmod(
                'module.exports = require("bla");',
                _sandbox
            ); }
        )
        .to.throw(
            'require is not a function'
        );
    });
});
