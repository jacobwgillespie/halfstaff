import React, { PropTypes } from 'react';

import styles from './BackgroundDimmer.scss';

export default function BackgroundDimmer({ lowered, children }) {
  return <div className={lowered ? styles.lowered : styles.raised}>{children}</div>;
}

BackgroundDimmer.propTypes = {
  children: PropTypes.node,
  lowered: PropTypes.bool,
};
