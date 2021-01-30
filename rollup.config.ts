import ts from '@wessberg/rollup-plugin-ts';

export default {
  input: './src/vmod.ts',
  output: {
    file: 'vmod.js',
    format: 'cjs',
    exports: 'default',
    strict: false,
    interop: false
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
      tsconfig: `${__dirname}/tsconfig.build.json`
    })
  ]
};
