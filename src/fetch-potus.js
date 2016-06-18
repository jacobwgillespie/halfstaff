/* eslint-disable no-console */

import buildXray from 'x-ray';
import crypto from 'crypto';
import Hashids from 'hashids';
import Knwl from 'knwl.js';
import moment from 'moment';

import 'moment-timezone';

const hashids = new Hashids('halfstaff');

const flatten = list => list.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);

const xInstance = buildXray();
const x = (...args) => new Promise((resolve, reject) => {
  xInstance(...args)((err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
});

const fetchProclamationLinks = (page = null) => {
  const query = page ? `?page=${page}` : '';
  const url = `https://www.whitehouse.gov/briefing-room/presidential-actions/proclamations${query}`;

  return x(url, ['h3 a@href']);
};

const fetchProclamation = url =>
  x(url, '#page', {
    title: '.pane-node-title h1',
    date: '.press-article-date',
    body: ['#content-start .field-items p@html'],
  }).then(
    data => ({ ...data, url, body: data.body.map(p => p.trim()) })
  );

const fetchFlagProclamations = async urls => {
  const proclamations = await Promise.all(urls.map(url => fetchProclamation(url)));
  return proclamations.filter(
    proclamation => proclamation.body.find(
      text => text.match(/half[\s-]staff/)
    )
  ).map(
    proclamation => {
      const knwl = new Knwl('english');
      knwl.init(proclamation.body.join(' '));

      const date = moment.tz(proclamation.date, 'MMMM D, YYYY', 'America/New_York').valueOf();
      const contentHash = crypto.createHash('md5').update(proclamation.title, 'utf8').digest('hex');
      const id = hashids.encodeHex(date.toString(16), contentHash);

      return {
        ...proclamation,
        id,
        date,
        nlp: knwl.get('dates').map(nlp => ({
          ...nlp,
          date: moment.tz({
            year: nlp.year,
            month: nlp.month - 1,
            day: nlp.day,
          }, 'America/New_York').valueOf(),
        })),
      };
    }
  );
};

(async () => {
  const allProclamations = flatten(await Promise.all([
    fetchProclamationLinks(),
    fetchProclamationLinks(1),
    fetchProclamationLinks(2),
    fetchProclamationLinks(3),
    fetchProclamationLinks(4),
    fetchProclamationLinks(5),
    fetchProclamationLinks(6),
    fetchProclamationLinks(7),
    fetchProclamationLinks(8),
    fetchProclamationLinks(9),
    fetchProclamationLinks(10),
  ]));

  const flagProclamations = await fetchFlagProclamations(allProclamations);

  console.log(JSON.stringify(flagProclamations));
})();
