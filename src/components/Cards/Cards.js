import React, { PropTypes } from 'react';

export default function Cards({ children }) {
  return (<div>{children}</div>);
}

Cards.propTypes = {
  children: PropTypes.node,
};
