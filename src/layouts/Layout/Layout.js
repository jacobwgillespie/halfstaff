import React, { PropTypes } from 'react';

import BackgroundDimmer from '../../components/BackgroundDimmer';
import Header from '../../components/Header';
import LoadingSplash from '../../components/LoadingSplash';

import styles from './Layout.scss';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <LoadingSplash />
      <BackgroundDimmer>
        <Header />
        {children}
      </BackgroundDimmer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
