import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import truncate from 'truncate';

import 'moment-timezone';

import { resetPageFlag } from '../../redux/modules/pageLowered';
import Card from '../../components/Card';
import Cards from '../../components/Cards';

import styles from './Home.scss';

export class Home extends Component {
  static propTypes = {
    currentlyLowered: PropTypes.bool,
    dispatch: PropTypes.func,
    recent: PropTypes.array,
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(resetPageFlag());
  }

  render() {
    const { currentlyLowered, recent } = this.props;

    const title = currentlyLowered
      ? 'The flag is at half staff'
      : 'The flag is at full staff';
    const description = truncate(
      currentlyLowered
        ? `${title}. ${recent[0].firstLine}`
        : `${title}. Browse recent flag notices and read about flag etiquette.`,
        150
    );

    return (
      <Cards>
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: description },
          ]}
        />
        <Card
          subtitle="Recent Notices"
          actions={
            <Link to="/notifications/">
              Receive notifications
            </Link>
          }
        >
          {recent.map(notice => (
            <div className={styles.recentNotice} key={notice.id}>
              <Link to={`/${notice.id}/`}>{notice.cleanTitle}</Link>
              <small>{moment.tz(notice.tags.startDate, 'America/New_York').format('LL')}</small>
            </div>
          ))}
        </Card>
      </Cards>
    );
  }
}

const mapStateToProps = ({ currentlyLowered, notices }) => ({
  currentlyLowered,
  recent: notices.recent.map(
    id => notices.store[id]
  ).filter(
    notice => notice
  ),
});

export default connect(mapStateToProps)(Home);
