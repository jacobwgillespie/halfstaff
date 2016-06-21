import gulp from 'gulp';
import revCollector from 'gulp-rev-collector';
import size from 'gulp-size';

import dirReplacements from './lib/dirReplacements';

gulp.task('copy', () =>
  gulp.src([
    '.tmp/rev/**/*.json',
    'app/*',
    '!app/*.html',
  ], {
    dot: true,
  })
    .pipe(revCollector({
      replaceReved: true,
      dirReplacements,
    }))
    .pipe(gulp.dest('dist'))
    .pipe(size({ title: 'copy' }))
);
