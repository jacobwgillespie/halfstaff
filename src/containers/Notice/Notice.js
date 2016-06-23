import { connect } from 'react-redux';
import moment from 'moment';
import React, { Component, PropTypes } from 'react';

import 'moment-timezone';

import { fetchNotice } from '../../redux/modules/notices';
import { lowerPageFlag } from '../../redux/modules/pageLowered';
import Card from '../../components/Card';
import Cards from '../../components/Cards';

import styles from './Notice.scss';

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

export class Notice extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    notice: PropTypes.object,
    params: PropTypes.object.isRequired,
  }

  static fetchData(state, dispatch, params) {
    if (!state.notices.store[params.id]) {
      return fetchNotice(params.id)(dispatch);
    }

    dispatch(lowerPageFlag());

    return Promise.resolve(true);
  }

  componentWillMount() {
    const { dispatch, notice, params } = this.props;
    const state = {
      notices: {
        notices: {
          [params.id]: notice,
        },
      },
    };

    this.constructor.fetchData(state, dispatch, params);
  }

  render() {
    const { notice } = this.props;

    if (!notice) return <Card>&nbsp;</Card>;

    let endTime;

    if (notice.tags.endTime === 'noon') {
      endTime = ' until noon';
    } else if (notice.tags.endTime === 'sunset') {
      endTime = ' until sunset';
    }

    const meta = [
      <div className={styles.time} key="start">
        <div className={styles.label}>Start</div>
        <div><time>{moment.tz(notice.tags.startDate, 'America/New_York').format('LL')}</time></div>
      </div>,
    ];

    if (notice.tags.endDate) {
      meta.push(
        <div className={styles.time} key="end">
          <div className={styles.label}>End</div>
          <div>
            <time>{moment.tz(notice.tags.endDate, 'America/Los_Angeles').format('LL')}</time>
            {endTime}
          </div>
        </div>
      );
    } else if (notice.tags.type === 'interment') {
      meta.push(
        <div className={styles.time} key="end">
          <div className={styles.label}>End</div>
          <div>The day of interment</div>
        </div>
      );
    }

    const text = trunc(notice.firstLine, 600);

    return (
      <Cards>
        <Card
          title={notice.cleanTitle}
          subtitle={moment.tz(notice.date, 'America/New_York').format('LL')}
          actions={
            <a href="<%- notice.url %>" target="_blank">More Information</a>
          }
          meta={meta}
        >
          <p dangerouslySetInnerHTML={{ __html: text }} />
        </Card>
      </Cards>
    );
  }
}

const mapStateToProps = ({ notices }, { params }) => ({
  notice: notices.store[params.id],
});

export default connect(mapStateToProps)(Notice);
