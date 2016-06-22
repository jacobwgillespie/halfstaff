import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('default', ['clean'], cb =>
  runSequence(
    'images',
    ['styles', 'scripts'],
    ['html', 'copy', 'vulcanize'],
    'generate-service-worker',
    cb
  )
);
