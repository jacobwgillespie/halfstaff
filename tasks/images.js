import cache from 'gulp-cache';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import rev from 'gulp-rev';
import size from 'gulp-size';

gulp.task('images', () =>
  gulp.src('app/images/**/*')
    .pipe(cache(imagemin({
      progressive: true,
      interlaced: true,
    })))
    .pipe(rev())
    .pipe(gulp.dest('dist/images'))
    .pipe(size({ title: 'images' }))
    .pipe(rev.manifest('images.json'))
    .pipe(gulp.dest('.tmp/rev'))
);
