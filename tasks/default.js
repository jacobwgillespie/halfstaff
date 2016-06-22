import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('default', ['clean'], cb =>
  runSequence(
    'images',
    ['styles', 'scripts'],
    ['html', 'copy'],
    'generate-service-worker',
    cb
  )
);
