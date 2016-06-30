import browserSync from 'browser-sync';
import gulp from 'gulp';

const reload = browserSync.reload;

gulp.task('serve', ['scripts', 'styles', 'templates'], () => {
  browserSync({
    notify: false,
    logPrefix: 'HS',
    scrollElementMapping: ['main'],
    server: ['.tmp', '.tmp/html', 'app', 'app/generatedPages'],
    port: 3000,
  });

  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/images/**/*'], reload);
  gulp.watch(['app/scripts/**/*.js'], ['scripts', reload]);
  gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['app/templates/**/*'], ['templates', reload]);
  gulp.watch(['data/**/*'], ['templates', reload]);
});

gulp.task('serve:dist', ['default'], () =>
  browserSync({
    notify: false,
    logPrefix: 'HS',
    scrollElementMapping: ['main'],
    server: 'dist',
    port: 3001,
  })
);
