import gulp from 'gulp';
import gulpIf from 'gulp-if';
import htmlmin from 'gulp-htmlmin';
import revCollector from 'gulp-rev-collector';
import size from 'gulp-size';
import useref from 'gulp-useref';

import dirReplacements from './lib/dirReplacements';

gulp.task('html', ['templates'], () =>
  gulp.src([
    '.tmp/rev/**/*.json',
    '.tmp/html/**/*.html',
    'app/**/*.html',
    '!app/{elements,test,bower_components}/**/*.html',
  ])
    .pipe(useref({
      searchPath: '{.tmp,app}',
      noAssets: true,
    }))
    .pipe(revCollector({
      replaceReved: true,
      dirReplacements,
    }))
    .pipe(gulpIf('*.html', htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true,
    })))
    .pipe(gulpIf('*.html', size({ title: 'html', showFiles: true })))
    .pipe(gulp.dest('dist'))
);
