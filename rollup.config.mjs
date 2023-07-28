import ts from 'rollup-plugin-ts';

/** @type {import('rollup').RollupOptions} */
export default {
  input: `./src/vmod.ts`,
  output: {
    file: './vmod.js',
    format: 'cjs',
    exports: 'default',
    interop: 'compat',
    strict: false
  },
  external: [
    'oget',
    'vm',
    'shortid',
    'path',
    'require-like'
  ],
  plugins: [
    ts({
      tsconfig: './tsconfig.build.json'
    })
  ]
};
