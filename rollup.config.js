import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import ts from "@wessberg/rollup-plugin-ts";
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';

const production = process.env.NODE_ENV === 'production';

const plugins = [
  replace({
    preventAssignment: true,
    values: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  }),
  ts({
    tsconfig: production ? 'tsconfig.prod.json' : 'tsconfig.json'
  }),
  commonjs(),
  resolve({
    browser: true,
    preferBuiltins: true
  }),
  production ? filesize() : null
]

export default {
  input: 'src/index.ts',
  output: [
    {
      sourcemap: true,
      file: 'dist/cjs/image-helpers.js',
      format: 'cjs'
    },
    {
      sourcemap: !production,
      file: 'dist/umd/image-helpers.js',
      format: 'umd',
      name: 'ImageHelpers',
      plugins: [
        production ? terser() : null
      ]
    },
    {
      sourcemap: true,
      file: 'dist/es/image-helpers.js',
      format: 'es'
    },
  ],
  plugins
};
