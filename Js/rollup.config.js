import typescript from 'rollup-plugin-typescript2'; 
import babel from 'rollup-plugin-babel'; 
// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import builtins from 'rollup-plugin-node-builtins'; 
// import globals from 'rollup-plugin-node-globals';
// import { terser } from 'rollup-plugin-terser'; 
export default {
    input: 'main.ts',
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        name:"alignment",
        sourcemap: false
      }, {
        file: 'dist/index.cjs.js',
        format: 'cjs',
        name:"alignment",
        sourcemap: false
      }, {
        file: 'dist/index.umd.js',
        format: 'umd',
        name:"alignment",
        sourcemap: false
      }
    ],
    plugins: [
        typescript(),
        babel(),
    ]
  }