import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
// import buble from 'rollup-plugin-buble';
import es3 from 'rollup-plugin-es3';
import {eslint} from 'rollup-plugin-eslint';
import pkg from '../package.json';

export default {
  input: pkg.src,
  output: {
    file: pkg.main,
    format: 'umd',
    name: 'hijacking-webpack-plugin',
    sourcemap: true
  },
  watch: {
    include: 'src/**'
  },
  plugins: [
    resolve(),
    commonjs(),
    json(),
    eslint({
      include: 'src/**',
      exclude: ['node_modules/**', 'lib/**'],
    }),
    babel({
      babelrc: false,
      presets: [['env', {modules: false, loose: true}]],
      include: ['src/**', 'test/**'],
      plugins: ['external-helpers'],
    }),
    es3({
      remove: ['defineProperty', 'freeze']
    }),
  ],
};
