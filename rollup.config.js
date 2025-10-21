// Rollup configuration for building ParticleText.js
// Run: npm install --save-dev rollup @rollup/plugin-babel @babel/core @babel/preset-env @rollup/plugin-terser @rollup/plugin-node-resolve --legacy-peer-deps
// Then: npm run build

import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';

const banner = `/**
 * ParticleText.js - Vanilla JS particle text animation library
 * @version ${require('./package.json').version}
 * @license MIT
 * @author Aayush Sinha
 */`;

export default [
  // UMD ES5 (for older browsers)
  {
    input: 'src/particleText.js',
    output: {
      file: 'dist/particleText.umd.js',
      format: 'umd',
      name: 'ParticleText',
      banner,
      sourcemap: true,
    },
    plugins: [
      resolve(),
      babel({
        babelHelpers: 'bundled',
        presets: [
          [
            '@babel/preset-env',
            {
              targets: { ie: '11' },
            },
          ],
        ],
      }),
    ],
  },
  // UMD ES5 Minified
  {
    input: 'src/particleText.js',
    output: {
      file: 'dist/particleText.umd.min.js',
      format: 'umd',
      name: 'ParticleText',
      banner,
      sourcemap: true,
    },
    plugins: [
      resolve(),
      babel({
        babelHelpers: 'bundled',
        presets: [
          [
            '@babel/preset-env',
            {
              targets: { ie: '11' },
            },
          ],
        ],
      }),
      terser({
        format: {
          comments: /^!/,
          preamble: banner,
        },
      }),
    ],
  },
  // ES Module (modern browsers)
  {
    input: 'src/particleText.js',
    output: {
      file: 'dist/particleText.esm.js',
      format: 'es',
      banner,
      sourcemap: true,
    },
    plugins: [resolve()],
  },
  // ES Module Minified
  {
    input: 'src/particleText.js',
    output: {
      file: 'dist/particleText.esm.min.js',
      format: 'es',
      banner,
      sourcemap: true,
    },
    plugins: [
      resolve(),
      terser({
        format: {
          comments: /^!/,
          preamble: banner,
        },
      }),
    ],
  },
];
