import React, { PropTypes } from 'react';

import Flag from '../Flag';
import MainContainer from '../MainContainer';

import styles from './FlagContainer.scss';

export default function FlagContainer({ children, className, lowered }) {
  const classes = className
    ? `${styles.container} ${className}`
    : styles.container;

  return (
    <MainContainer className={classes}>
      <Flag lowered={lowered} className={styles.flag} />
      <div className={styles.children}>
        {children}
      </div>
    </MainContainer>
  );
}

FlagContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  lowered: PropTypes.bool,
};
