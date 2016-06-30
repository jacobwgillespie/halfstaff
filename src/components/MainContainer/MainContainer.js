import React, { PropTypes } from 'react';

import styles from './MainContainer.scss';

export default function MainContainer({ children, className }) {
  const classes = className
    ? `${styles.container || ''} ${className}`
    : styles.container;

  return <div className={classes}>{children}</div>;
}

MainContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
