/* eslint-disable no-console */

import fs from 'fs-extra';
import moment from 'moment';
import path from 'path';

import 'moment-timezone';

import potus from '../data/potus.json';

const flatten = list => list.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);

const basePath = path.join(__dirname, '..', 'data');
const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];
const endTimes = '(noon|sunset)';
const date = `(this )?(${months.join('|')}) \\d{1,2},? \\d{4}`;
const relativeDate = '(on (the|this)( \\w+)? day( of (interment))?)';
const untilRegex = new RegExp(`(until|through)( ${endTimes})?,? ((${date})|${relativeDate})`, 'i');

const tagProclamation = proclamation => {
  const textBody = proclamation.body.map(
    text => text.replace(/\s/, ' ').replace(/[ ]{2,}/, ' ').trim()
  ).join(' ');

  const tags = {};

  if (textBody.match(/on the day of interment/i)) {
    tags.type = 'interment';
    tags.person = (textBody.match(/death of (\w+ \w+)/i) || [])[1];
    if (tags.person) {
      tags.person = textBody.match(new RegExp(`${tags.person}`, 'ig'));
      tags.person = tags.person[tags.person.length - 1];
    }
  } else {
    tags.type = 'date';
  }

  const durations = textBody.match(untilRegex);

  let newestDate = moment.tz(proclamation.date, 'America/Los_Angeles');
  proclamation.nlp.forEach(nlp => {
    const nlpDate = moment.tz(nlp.date, 'America/Los_Angeles');
    if (nlpDate.isAfter(newestDate)) newestDate = nlpDate;
  });
  tags.newestDate = newestDate.valueOf();

  if (durations && durations.length > 0) {
    tags.startDate = proclamation.date;
    if (durations[1] === 'through') {
      tags.endTime = 'end_of_day';
    } else {
      tags.endTime = durations[3];
    }

    if (durations[5]) {
      tags.endDate = moment
        .tz(durations[5], 'MMMM D, YYYY', 'America/Los_Angeles')
        .endOf('day')
        .valueOf();
    }
  } else {
    tags.startDate = newestDate.startOf('day').valueOf();
    tags.endDate = newestDate.endOf('day').valueOf();
    tags.endTime = 'end_of_day';
  }

  return {
    ...proclamation,
    tags,
  };
};

const buildHTML = proclamation => {
  const normalizedBody = flatten(proclamation.body.map(
    line => line.replace(/[\t\n]/, ' ').split(/<br( ?\/)?>/)
  ));

  let firstLine;

  const html = normalizedBody.filter(
    line => line
  ).map(line => {
    const trimmedLine = line.replace(/&(#xA0|nbsp);$/, '').trim();

    if (trimmedLine.match(/[a-z]/)) {
      if (!firstLine) firstLine = trimmedLine;
      return `<p>${trimmedLine}</p>`;
    }
    return `<p class="center">${trimmedLine}</p>`;
  }).join('');

  const cleanTitle = proclamation.title.replace(/presidential proclamation( --|:)/i, '').trim();

  return {
    ...proclamation,
    html,
    firstLine,
    cleanTitle,
  };
};

const proclamations = potus.map(
  proclamation => tagProclamation(proclamation)
).map(
  proclamation => buildHTML(proclamation)
);

proclamations.forEach(proclamation => {
  fs.writeJson(path.join(basePath, 'potus', `${proclamation.id}.json`), proclamation);
});

fs.writeJson(path.join(basePath, 'recent.json'), proclamations);
