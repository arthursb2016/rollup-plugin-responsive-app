import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    }
  ],
  external: ['magic-string'],
  plugins: [
    typescript(),
    resolve(),
    commonjs(),
    terser()
  ]
}