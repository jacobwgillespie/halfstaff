import { output as pagespeed } from 'psi';
import autoprefixer from 'gulp-autoprefixer';
import babel from 'gulp-babel';
import browserSync from 'browser-sync';
import cache from 'gulp-cache';
import concat from 'gulp-concat';
import cssnano from 'gulp-cssnano';
import del from 'del';
import fs from 'fs';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';
import path from 'path';
import realFavicon from 'gulp-real-favicon';
import rev from 'gulp-rev';
import revCollector from 'gulp-rev-collector';
import runSequence from 'run-sequence';
import sass from 'gulp-sass';
import size from 'gulp-size';
import sourcemaps from 'gulp-sourcemaps';
import swPrecache from 'sw-precache';
import uglify from 'gulp-uglify';
import uncss from 'gulp-uncss';
import useref from 'gulp-useref';

import pkg from './package.json';

const FAVICON_DATA_FILE = 'faviconData.json';
const ASSET_HOST = process.env.ASSET_HOST || '';
const reload = browserSync.reload;

const useAssetHost = base => manifestValue => `${ASSET_HOST}${base}${manifestValue}`;
const dirReplacements = {
  '/images/': useAssetHost('/images/'),
  '/scripts/': useAssetHost('/scripts/'),
  '/styles/': useAssetHost('/styles/'),
  '/': '/',
};

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
    'dist/rev/**/*.json',
    'app/*',
    '!app/*.html',
  ], {
    dot: true,
  })
    .pipe(revCollector({
      replaceReved: true,
      dirReplacements,
    }))
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

gulp.task('scripts', () =>
  gulp.src([
    'app/scripts/main.js',
  ])
    .pipe(newer('.tmp/scripts'))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(concat('main.min.js'))
    .pipe(uglify({ preserveComments: 'some' }))
    .pipe(rev())
    .pipe(size({ title: 'scripts' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rev.manifest('scripts.json'))
    .pipe(gulp.dest('dist/rev'))
);

gulp.task('html', () =>
  gulp.src(['dist/rev/**/*.json', 'app/generatedPages/**/*.html'])
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

gulp.task('clean', () => del(['.tmp', 'dist/*', '!dist/.git'], { dot: true }));

gulp.task('serve', ['scripts', 'styles'], () => {
  browserSync({
    notify: false,
    logPrefix: 'HS',
    scrollElementMapping: ['main'],
    server: ['.tmp', 'app', 'app/generatedPages'],
    port: 3000,
  });

  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['app/scripts/**/*.js'], ['scripts', reload]);
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
    ['styles', 'scripts'],
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
      `${rootDir}/scripts/**/*.js`,
      `${rootDir}/styles/**/*.css`,
      `${rootDir}/*.{html,json}`,
    ],
    // Translates a static file path to the relative URL that it's served from.
    // This is '/' rather than path.sep because the paths returned from
    // glob always use '/'.
    stripPrefix: `${rootDir}/`,
    replacePrefix: ASSET_HOST ? `${ASSET_HOST}/` : '',
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
    iconsPath: '/images/icons/',
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
