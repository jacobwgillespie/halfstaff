import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import React, { Component, PropTypes } from 'react';

import 'moment-timezone';

import { resetPageFlag } from '../../redux/modules/pageLowered';
import Card from '../../components/Card';
import Cards from '../../components/Cards';

import styles from './Home.scss';

export class Home extends Component {
  static propTypes = {
    recent: PropTypes.array,
    dispatch: PropTypes.func,
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(resetPageFlag());
  }

  render() {
    const { recent } = this.props;

    return (
      <Cards>
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

const mapStateToProps = ({ potus }) => ({
  recent: potus.recent.map(id => potus.notices[id]).filter(notice => notice),
});

export default connect(mapStateToProps)(Home);
