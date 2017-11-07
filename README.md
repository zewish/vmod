[![NPM version](https://img.shields.io/npm/v/vmod.svg?style=flat-square)](https://www.npmjs.com/package/vmod)
[![Build Status](https://travis-ci.org/zewish/vmod.svg?branch=master)](https://travis-ci.org/zewish/vmod)
[![Downloads](https://img.shields.io/npm/dm/vmod.svg?style=flat-square)](https://www.npmjs.com/package/vmod)

Virtual module for node.js - vmod

- Executes string of in require-like context;
- Allows passing custom sandbox environment;

Known limitations:
- console.log, console.warn, console.error, etc. output not visible;

Installation
------------
```bash
$ npm install vmod --save
```

Simple
------
```js
'use strict';
const vmod = require('vmod');

console.log(
    vmod('module.exports = 123;')
); // 123
```

Export function
---------------
```js
'use strict';
const vmod = require('vmod');

console.log(
    vmod(
        'module.exports = () => "yay!";'
    )()
); // "yay!"
```

Require External file
---------------------
```js
/*
./_test-file.js:
module.exports = "test file data";
*/

'use strict';
const vmod = require('vmod');

console.log(
    vmod(
        'module.exports = require("./_test-file.js")'
    )()
); // "test file data"
```

Override sandbox variable
-------------------------
```js
'use strict';
const vmod = require('vmod');

vmod(
    'module.exports = require("./_test-file.js")',
    { require: null }
); // TypeError: require is not a function
```
