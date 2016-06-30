import React, { PropTypes } from 'react';

import styles from './Flag.scss';

export default function Flag({ className, lowered }) {
  const flagClass = lowered
    ? styles.half
    : styles.full;

  const classes = className
    ? `${className} ${flagClass}`
    : flagClass;

  /* eslint-disable max-len */
  return (
    <svg className={classes} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 57 144">
      <title>American Flag</title>
      <g>
        <g>
          <g>
            <g className={styles.banner}>
              <path className={styles.cls1} d="M40,43H57v3H40V43Z" />
              <path className={styles.cls2} d="M40,40H57v3H40V40Z" />
              <path className={styles.cls6} d="M8,7H28V25H8V7Z" />
              <path className={styles.cls7} d="M14,9.28l0.93,1.88L17,11.46l-1.5,1.47L15.85,15,14,14l-1.86,1,0.36-2.07L11,11.46l2.08-.3L14,9.28" />
              <path className={styles.cls7} d="M22,9l0.93,1.88L25,11.19l-1.5,1.47,0.35,2.07-1.86-1-1.86,1,0.35-2.07L19,11.19l2.08-.3L22,9" />
              <path className={styles.cls7} d="M14,16.28l0.93,1.88L17,18.46l-1.5,1.47L15.85,22,14,21l-1.86,1,0.36-2.07L11,18.46l2.08-.3L14,16.28" />
              <path className={styles.cls7} d="M22,16l0.93,1.88L25,18.18l-1.5,1.47,0.35,2.07-1.86-1-1.86,1,0.35-2.07L19,18.18l2.08-.3L22,16" />
              <path className={styles.cls9} d="M40,46V40h5l-5,6" />
              <path className={styles.cls10} d="M28,7H45v3H28V7Z" />
              <path className={styles.cls11} d="M28,10H45v3H28V10Z" />
              <path className={styles.cls10} d="M28,13H45v3H28V13Z" />
              <path className={styles.cls11} d="M28,16H45v3H28V16Z" />
              <path className={styles.cls10} d="M28,19H45v3H28V19Z" />
              <path className={styles.cls11} d="M28,22H45v3H28V22Z" />
              <path className={styles.cls1} d="M45,13H57v3H45V13Z" />
              <path className={styles.cls2} d="M45,16H57v3H45V16Z" />
              <path className={styles.cls1} d="M45,19H57v3H45V19Z" />
              <path className={styles.cls2} d="M45,22H57v3H45V22Z" />
              <path className={styles.cls1} d="M45,25H57v3H45V25Z" />
              <path className={styles.cls2} d="M45,28H57v3H45V28Z" />
              <path className={styles.cls1} d="M45,31H57v3H45V31Z" />
              <path className={styles.cls1} d="M45,37H57v3H45V37Z" />
              <path className={styles.cls2} d="M45,34H57v3H45V34Z" />
              <path className={styles.cls10} d="M8,25H45v3H8V25Z" />
              <path className={styles.cls11} d="M8,28H45v3H8V28Z" />
              <path className={styles.cls10} d="M8,31H45v3H8V31Z" />
              <path className={styles.cls11} d="M8,34H45v3H8V34Z" />
              <path className={styles.cls10} d="M8,37H45v3H8V37Z" />
            </g>

            <path className={styles.cls3} d="M12,144H0v-2.3A0.7,0.7,0,0,1,.7,141H11.3a0.7,0.7,0,0,1,.7.7V144" />
            <path className={styles.cls4} d="M7,31a1,1,0,0,0,1,1V30a1,1,0,0,0-1,1" />
            <path className={styles.cls3} d="M4,7H8V139H4V7Z" />
            <path className={styles.cls5} d="M2,138h8v3H2v-3Z" />
            <path className={styles.cls8} d="M10,4A4,4,0,1,1,6,0a4,4,0,0,1,4,4" />
          </g>
        </g>
      </g>
    </svg>
  );
  /* eslint-enable max-len */
}

Flag.propTypes = {
  className: PropTypes.string,
  lowered: PropTypes.bool,
};
