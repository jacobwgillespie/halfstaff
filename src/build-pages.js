import ect from 'ect';
import fs from 'fs-extra';
import moment from 'moment';
import path from 'path';

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

sources.forEach(filename => {
  const potus = fs.readJsonSync(path.join(potusPath, filename));

  const cleanTitle = potus.title.replace(/presidential proclamation( --|:)/i, '').trim();

  const title = `${moment(potus.date).format('LL')} - ${cleanTitle}`;
  const description = trunc(`The flag is at half staff. ${potus.firstLine}`, 150);

  const data = {
    cleanTitle,
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
