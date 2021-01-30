import { expect, should } from 'chai';
import vmod from './vmod';
import fs from 'fs';

should();

describe('vmod.js', () => {
  it('exports a function', () => {
    vmod.should.be.a('function');
  });

  it('returns {}', () => {
    vmod('var a = "whatever";').should.be.eql({});
  });

  it('returns 1', () => {
    vmod('module.exports = 1;').should.be.equal(1);
  });

  it('returns a function', () => {
    const fn = vmod(
      'module.exports = () => "So internal!";'
    );

    expect(fn).to.be.a('function');
    expect(fn()).to.be.equal('So internal!');
  });

  it('throws an error', () => {
    expect(
      () => vmod(
        'console.log(bla);'
      )
    ).to.throw(
      'bla is not defined'
    );
  });

  it('throws an error', () => {
    expect(
      () => vmod(
        'console.log(bla);'
      )
    ).to.throw(
      'bla is not defined'
    );
  });

  it('sets proper virtual filename', () => {
    try {
      vmod(
        'console.log(bla);'
      );
    } catch (err) {
      expect(
        err.stack
          .split('\n')[0]
          .endsWith('__virtual__:1')
      ).to.be.true;
  }
  });

  it('sets custom sandbox', () => {
    const _sandbox = {
      require: null
    };

    const res = vmod(
      'module.exports = global;',
      _sandbox
    );

    expect(res.require).to.be.null;
  });

  it('can require real files', () => {
    const TEST_FILE_PATH = `${__dirname}/_test-file.js`;

    fs.writeFileSync(
      TEST_FILE_PATH,
      'module.exports = "test file data";',
      'utf8'
    );

    expect(
      vmod(
        `module.exports = require("${TEST_FILE_PATH}");`
      )
    ).to.equal('test file data');

    fs.unlinkSync(TEST_FILE_PATH);
  });

  it('sets proper __filename', () => {
    expect(
      vmod('module.exports = __filename').endsWith(
        '.__virtual__'
      )
    ).to.be.true;
  });

  it('sets proper __dirname', () => {
    expect(
      vmod('module.exports = __dirname')
    ).to.be.equal(__dirname);
  });

  it('allows override of a sandbox variable', () => {
    const _sandbox = {
      require: null
    };

    expect(
      () => vmod(
        'module.exports = require("bla");',
        _sandbox
      )
    ).to.throw('require is not a function');
  });
});
