import buffer from 'vinyl-buffer';
import gulp from 'gulp';
import moment from 'moment';
import path from 'path';
import source from 'vinyl-source-stream';

import 'moment-timezone';

import recent from '../data/recent.json';
import renderEct from './lib/renderEct';

const dest = '.tmp/html';

const trunc = (string, n, useWordBoundary = true) => {
  const isTooLong = string.length > n;
  let shortenedString = isTooLong
    ? string.substr(0, n - 1)
    : string;
  shortenedString = (useWordBoundary && isTooLong)
    ? shortenedString.substr(0, shortenedString.lastIndexOf(' '))
    : shortenedString;

  return isTooLong ? `${shortenedString.replace(/\s[\w.]+\s*$/, '')}&hellip;` : shortenedString;
};

const oneDay = 1000 * 60 * 60 * 24;
const now = moment().valueOf();
const current = recent.filter(
  potus => potus.tags.startDate <= now
    && (
      (potus.tags.endDate && potus.tags.endDate >= now)
      || (!potus.tags.endDate && (potus.tags.startDate + oneDay) >= now)
    )
);

const halfstaff = current.length > 0;

const helpers = {
  halfstaff,
  moment,
  trunc,
};

const rewritePath = file => {
  const extname = path.extname(file.path);
  const basename = path.basename(file.path, extname);

  return file.path.replace(`${basename}${extname}`, `${basename}/index.html`);
};

gulp.task('templates:potus', () =>
  gulp.src('data/potus/*.json')
    .pipe(renderEct({
      path: 'app/templates',
      template: 'potus.ect',
      helpers: {
        ...helpers,
        halfstaff: true,
        currentHalfstaff: halfstaff,
      },
      rewritePath,
    }))
    .pipe(gulp.dest(dest))
);

gulp.task('templates:index', () => {
  const stream = source('index.json');
  stream.write('{}');
  process.nextTick(() => stream.end());

  return stream
    .pipe(buffer())
    .pipe(renderEct({
      path: 'app/templates',
      template: 'home.ect',
      helpers: {
        ...helpers,
        currentHalfstaff: halfstaff,
        recent,
        current,
      },
    }))
    .pipe(gulp.dest(dest));
});

gulp.task('templates:about', () => {
  const stream = source('about.json');
  stream.write('{}');
  process.nextTick(() => stream.end());

  return stream
    .pipe(buffer())
    .pipe(renderEct({
      path: 'app/templates',
      template: 'about.ect',
      helpers: {
        ...helpers,
        currentHalfstaff: halfstaff,
      },
      rewritePath,
    }))
    .pipe(gulp.dest(dest));
});

gulp.task('templates:notifications', () => {
  const stream = source('notifications.json');
  stream.write('{}');
  process.nextTick(() => stream.end());

  return stream
    .pipe(buffer())
    .pipe(renderEct({
      path: 'app/templates',
      template: 'notifications.ect',
      helpers: {
        ...helpers,
        currentHalfstaff: halfstaff,
      },
      rewritePath,
    }))
    .pipe(gulp.dest(dest));
});

gulp.task('templates', [
  'templates:about',
  'templates:index',
  'templates:notifications',
  'templates:potus',
]);
