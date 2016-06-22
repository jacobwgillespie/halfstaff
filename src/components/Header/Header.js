import { Link } from 'react-router';
import React, { PropTypes } from 'react';

import styles from './Header.scss';

export default function Header({ halfstaff }) {
  const status = halfstaff
    ? 'Half Staff'
    : 'Full Staff';

  return (
    <header className={styles.header}>
      <Link className={styles.title} to="/">
        <small>currently at</small><br />
        {status}
      </Link>
      <ul className={styles.menu}>
        <li><Link to="/about/">About</Link></li>
        <li className={styles.smsLink}><Link to="/notifications/">SMS Notifications</Link></li>
      </ul>
    </header>
  );
}

Header.propTypes = {
  halfstaff: PropTypes.bool,
};
