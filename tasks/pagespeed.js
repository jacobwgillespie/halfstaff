import { output as pagespeed } from 'psi';
import gulp from 'gulp';

gulp.task('pagespeed', cb =>
  pagespeed('halfstaff.co', {
    strategy: 'mobile',
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
  }, cb)
);
