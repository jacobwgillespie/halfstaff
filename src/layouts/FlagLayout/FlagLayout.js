import { connect } from 'react-redux';
import React, { PropTypes } from 'react';

import BackgroundDimmer from '../../components/BackgroundDimmer';
import Header from '../../components/Header';
import LoadingSplash from '../../components/LoadingSplash';
import Flag from '../../components/Flag';
import MainContainer from '../../components/MainContainer';

import styles from './FlagLayout.scss';

export function Layout({ children, currentlyLowered, pageLowered }) {
  const lowered = pageLowered !== null && pageLowered !== undefined
    ? pageLowered
    : currentlyLowered;

  return (
    <div className={styles.container}>
      <LoadingSplash />
      <BackgroundDimmer lowered={lowered}>
        <Header />
        <MainContainer className={styles.childrenContainer}>
          <Flag lowered={lowered} className={styles.flag} />
          <div className={styles.children}>
            {children}
          </div>
        </MainContainer>
      </BackgroundDimmer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  currentlyLowered: PropTypes.bool,
  pageLowered: PropTypes.bool,
};

const mapStateToProps = ({ currentlyLowered, pageLowered }) => ({ currentlyLowered, pageLowered });

export default connect(mapStateToProps)(Layout);
