/* eslint-disable no-param-reassign */

import gutil from 'gulp-util';
import through from 'through2';
import ect from 'ect';

const defaultOptions = {
  ext: '.html',
  helpers: {},
  inheritExtension: false,
  path: '.',
  rewritePath: false,
  template: null,
};

const renderEct = (opts = {}) => {
  const options = {
    ...defaultOptions,
    ...opts,
  };

  const renderer = ect({
    root: options.path,
  });

  return through.obj(function streamTransform(file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    try {
      const data = JSON.parse(file.contents.toString());

      const html = renderer.render(options.template, {
        ...options.helpers,
        data,
      });

      file.contents = new Buffer(html);

      if (!options.inheritExtension) {
        if (options.rewritePath) {
          file.path = options.rewritePath(file, data);
        } else {
          file.path = gutil.replaceExtension(file.path, options.ext);
        }
      }

      this.push(file);

      return cb();
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-render-ect', err, {
        filename: file.path,
      }));
      return cb();
    }
  });
};

export default renderEct;
