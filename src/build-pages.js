import ect from 'ect';
import fs from 'fs-extra';
import moment from 'moment';
import path from 'path';

import recent from '../data/recent.json';

const renderer = ect({ root: path.join(__dirname, 'templates') });

const potusPath = path.join(__dirname, '..', 'data', 'potus');
const destPath = path.join(__dirname, '..', 'dist');
const sources = fs.readdirSync(potusPath);

const trunc = (string, n, useWordBoundary = true) => {
  const isTooLong = string.length > n;
  let shortenedString = isTooLong
    ? string.substr(0, n - 1)
    : string;
  shortenedString = (useWordBoundary && isTooLong)
    ? shortenedString.substr(0, shortenedString.lastIndexOf(' '))
    : shortenedString;

  return isTooLong ? `${shortenedString.replace(/\s[\w.]+\s*$/, '')}&hellip;` : shortenedString;
};

const oneDay = 1000 * 60 * 60 * 24;
const now = moment.utc([2016, 5, 15, 10, 10, 10]).valueOf();
const current = recent.filter(
  potus => potus.tags.startDate <= now
    && (
      (potus.tags.endDate && potus.tags.endDate >= now)
      || (!potus.tags.endDate && (potus.tags.startDate + oneDay) >= now)
    )
);

const halfstaff = current.length > 0;

sources.forEach(filename => {
  const potus = fs.readJsonSync(path.join(potusPath, filename));

  const title = `${moment(potus.date).format('LL')} - ${potus.cleanTitle}`;
  const description = trunc(`The flag is at half staff. ${potus.firstLine}`, 150);

  const data = {
    currentHalfstaff: halfstaff,
    description,
    halfstaff: true,
    moment,
    potus,
    title,
    trunc,
  };

  const html = renderer.render('potus.ect', data);

  fs.outputFileSync(path.join(destPath, `${potus.id}/index.html`), html);
});

const buildHome = () => {
  const title = halfstaff
    ? 'The flag is at half staff'
    : 'The flag is at full staff';
  const description = trunc(halfstaff
    ? `${title}. ${current[0].firstLine}`
    : '${title}. Browse recent flag notices and read about flag etiquette.',
    150
  );

  const data = {
    current,
    currentHalfstaff: halfstaff,
    description,
    halfstaff,
    moment,
    recent,
    title,
    trunc,
  };

  const html = renderer.render('home.ect', data);

  fs.outputFileSync(path.join(destPath, 'index.html'), html);
};

buildHome();
