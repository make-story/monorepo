import { resolve } from 'path';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import json from 'rollup-plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import addGlobalTypes from 'rollup-plugin-add-global-ts';

const PackageJson = require('./package.json');
const aliasConfig = {
  entries: [
    { find: '@', replacement: resolve(__dirname, PackageJson.sourceRoot) },
  ],
};

// TODO: mangle, uglify 해야함
export default [
  {
    input: PackageJson.entry,
    output: {
      file: PackageJson.main,
      format: 'esm',
      sourcemap: true,
    },
    plugins: [json(), peerDepsExternal(), typescript(), babel()],
  },
  {
    input: PackageJson.entry,
    output: [{ file: PackageJson.typings, format: 'cjs' }],
    plugins: [
      addGlobalTypes([PackageJson.globalType]),
      dts(),
      alias(aliasConfig),
    ],
  },
];
