import React, { PropTypes } from 'react';

import styles from './Card.scss';

export default function Card({
  actions,
  children,
  meta,
  subtitle,
  title,
}) {
  return (
    <div className={styles.card}>
      {(title || subtitle) && <div className={styles.title}>
        {subtitle && <h3>{subtitle}</h3>}
        {title && <h2>{title}</h2>}
      </div>}
      {children && <div className={styles.text}>{children}</div>}
      {meta && <div className={styles.meta}>{meta}</div>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}

Card.propTypes = {
  actions: PropTypes.node,
  children: PropTypes.node,
  meta: PropTypes.node,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};
