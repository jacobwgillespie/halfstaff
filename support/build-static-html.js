import fs from 'fs-extra';
import path from 'path';

import { staticRender } from '../dist/server.js';

const paths = [
  '/',
  '/about/',
  '/notifications/',
].concat(
  fs.readdirSync(path.join(__dirname, '..', 'data', 'notices')).map(
    filename => `/${filename.replace('.json', '')}/`
  )
);

paths.forEach(urlPath => {
  const req = {
    path: urlPath,
    url: urlPath,
    headers: {},
  };
  staticRender(req, (err, html) => {
    if (err) return;

    fs.outputFile(`${__dirname}/../dist${urlPath}index.html`, html);
  });
});
