import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'gulp-cssnano';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import newer from 'gulp-newer';
import rev from 'gulp-rev';
import sass from 'gulp-sass';
import size from 'gulp-size';
import sourcemaps from 'gulp-sourcemaps';
import uncss from 'gulp-uncss';

gulp.task('styles', ['templates'], () => {
  const AUTOPREFIXER_BROWSERS = ['last 2 versions'];

  return gulp.src([
    'app/styles/**/*.scss',
    'app/styles/**/*.css',
  ])
    .pipe(newer('.tmp/styles'))
    .pipe(sourcemaps.init())
    .pipe(sass({
      precision: 10,
    }).on('error', sass.logError))
    // Remove any unused CSS
    .pipe(gulpIf('*.css', uncss({
      html: [
        '.tmp/html/**/*.html',
      ],
    })))
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp/styles'))
    // Concatenate and minify styles
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(rev())
    .pipe(size({ title: 'styles' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rev.manifest('styles.json'))
    .pipe(gulp.dest('.tmp/rev'));
});
