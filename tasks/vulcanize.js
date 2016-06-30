import crisper from 'gulp-crisper';
import cssslam from 'css-slam';
import gIf from 'gulp-if';
import gulp from 'gulp';
import vulcanize from 'gulp-vulcanize';

import { errorHandler, minifyHtml, uglifyJS } from './lib/shared';

gulp.task('vulcanize', () =>
  gulp.src('app/elements/elements.html')
    .pipe(vulcanize({
      stripComments: true,
      inlineCss: true,
      inlineScripts: true,
      excludes: [],
      stripExcludes: [
        'roboto.html',
        'iron-selector.html',
        'paper-tabs.html',
        'polymer.html',
        'shared-app-styles.html',
        'io-icons.html',
      ],
      dest: 'app/elements',
    }))
    .on('error', errorHandler)
    .pipe(crisper({ scriptInHead: true }))
    .pipe(gIf('*.html', minifyHtml()))
    .pipe(gIf('*.html', cssslam.gulp()))
    .pipe(gIf('*.js', uglifyJS()))
    .pipe(gulp.dest('dist/elements'))
);
