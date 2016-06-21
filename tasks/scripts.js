import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import concat from 'gulp-concat';
import gulp from 'gulp';
import rev from 'gulp-rev';
import size from 'gulp-size';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';

gulp.task('scripts', () => {
  const b = browserify({
    entries: 'app/scripts/main.js',
    debug: true,
    transform: [babelify],
  });

  return b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    // .pipe(streamify(newer('.tmp/scripts')))
    .pipe(sourcemaps.init())
    // .pipe(babel())
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(concat('main.min.js'))
    .pipe(uglify({ preserveComments: 'some' }))
    .pipe(rev())
    .pipe(size({ title: 'scripts' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rev.manifest('scripts.json'))
    .pipe(gulp.dest('.tmp/rev'));
});
