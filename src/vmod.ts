import oget from 'oget';
import { Script } from 'vm';
import requireLike from 'require-like';
import { generate as shortid } from 'shortid';
import { dirname } from 'path';

interface ModuleSandbox {
  [key: string]: any;
}

const vmod = (code: string, sandboxOverride: ModuleSandbox = {}) => {
  const filename = oget(
    module,
    'parent.filename',
    __filename
  ) + `.${shortid()}.__virtual__`;

  const sandbox: ModuleSandbox = {
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
    ...sandboxOverride
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

export default vmod;
