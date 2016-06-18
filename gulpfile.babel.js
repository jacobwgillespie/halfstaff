import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'gulp-cssnano';
import del from 'del';
// import filter from 'gulp-filter';
import gulp from 'gulp';
import path from 'path';
// import postcss from 'gulp-postcss';
import rev from 'gulp-rev';
// import revReplace from 'gulp-rev-replace';
import sass from 'gulp-sass';
import useref from 'gulp-useref';
import realFavicon from 'gulp-real-favicon';
import fs from 'fs';
import size from 'gulp-size';
import newer from 'gulp-newer';
import gulpIf from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import uncss from 'gulp-uncss';
import htmlmin from 'gulp-htmlmin';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import revCollector from 'gulp-rev-collector';
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import { output as pagespeed } from 'psi';
import swPrecache from 'sw-precache';

import pkg from './package.json';

const FAVICON_DATA_FILE = 'faviconData.json';
const reload = browserSync.reload;

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
    .pipe(gulp.dest('dist/rev'))
);

gulp.task('copy', () =>
  gulp.src([
    'app/*',
    '!app/*.html',
  ], {
    dot: true,
  })
    .pipe(gulp.dest('dist'))
    .pipe(size({ title: 'copy' }))
);

gulp.task('styles', () => {
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
        'app/generatedPages/**/*.html',
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
    .pipe(gulp.dest('dist/rev'));
});

gulp.task('html', () =>
  gulp.src(['dist/rev/**/*.json', 'app/generatedPages/**/*.html'])
    .pipe(useref({
      searchPath: '{.tmp,app}',
      noAssets: true,
    }))

    // Minify any HTML
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
    // Output files
    .pipe(revCollector({
      replaceReved: true,
    }))
    .pipe(gulpIf('*.html', size({ title: 'html', showFiles: true })))
    .pipe(gulp.dest('dist'))
);

gulp.task('clean', () => del(['.tmp', 'dist/*', '!dist/.git'], { dot: true }));

gulp.task('serve', ['scripts', 'styles'], () => {
  browserSync({
    notify: false,
    logPrefix: 'HS',
    scrollElementMapping: ['main'],
    server: ['.tmp', 'app'],
    port: 3000,
  });

  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['app/scripts/**/*.js'], ['lint', 'scripts', reload]);
  gulp.watch(['app/images/**/*'], reload);
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

gulp.task('default', ['clean'], cb =>
  runSequence(
    'images',
    'styles',
    ['html', 'copy'],
    'generate-service-worker',
    cb
  )
);

gulp.task('pagespeed', cb =>
  pagespeed('halfstaff.co', {
    strategy: 'mobile',
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
  }, cb)
);

gulp.task('copy-sw-scripts', () =>
  gulp.src(['node_modules/sw-toolbox/sw-toolbox.js', 'app/scripts/sw/runtime-caching.js'])
    .pipe(gulp.dest('dist/scripts/sw'))
);

gulp.task('generate-service-worker', ['copy-sw-scripts'], () => {
  const rootDir = 'dist';
  const filepath = path.join(rootDir, 'service-worker.js');

  return swPrecache.write(filepath, {
    // Used to avoid cache conflicts when serving on localhost.
    cacheId: pkg.name || 'half-staff',
    // sw-toolbox.js needs to be listed first. It sets up methods used in runtime-caching.js.
    importScripts: [
      'scripts/sw/sw-toolbox.js',
      'scripts/sw/runtime-caching.js',
    ],
    staticFileGlobs: [
      // Add/remove glob patterns to match your directory setup.
      `${rootDir}/images/**/*`,
      // `${rootDir}/scripts/**/*.js`,
      `${rootDir}/styles/**/*.css`,
      `${rootDir}/*.{html,json}`,
    ],
    // Translates a static file path to the relative URL that it's served from.
    // This is '/' rather than path.sep because the paths returned from
    // glob always use '/'.
    stripPrefix: `${rootDir}/`,
  });
});

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-icons', (done) => {
  realFavicon.generateFavicon({
    masterPicture: 'app/images/icon.svg',
    dest: 'app/images/icons/',
    iconsPath: '/icons/',
    design: {
      ios: {
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: '#ffffff',
        margin: '14%',
        appName: 'Half Staff',
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: '#da532c',
        onConflict: 'override',
        appName: 'Half Staff',
      },
      androidChrome: {
        pictureAspect: 'shadow',
        themeColor: '#263238',
        manifest: {
          name: 'Half Staff',
          startUrl: 'https://halfstaff.co',
          display: 'standalone',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true,
        },
      },
      safariPinnedTab: {
        pictureAspect: 'silhouette',
        themeColor: '#263238',
      },
    },
    settings: {
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false,
    },
    markupFile: FAVICON_DATA_FILE,
  }, () => {
    done();
  });
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', (done) => {
  const currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, (err) => {
    if (err) {
      throw err;
    }
    done();
  });
});
