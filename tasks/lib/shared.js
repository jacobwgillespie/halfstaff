/* eslint-disable no-console */

import gMinifyHtml from 'gulp-minify-html';
import uglify from 'gulp-uglify';

export const errorHandler = console.error.bind(console);

export function minifyHtml() {
  return gMinifyHtml({
    quotes: true,
    empty: true,
    spare: true,
  }).on('error', console.error.bind(console));
}

export function uglifyJS() {
  return uglify({ preserveComments: 'some' });
}
