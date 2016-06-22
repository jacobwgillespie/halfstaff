import { Component, PropTypes } from 'react';

export default class FlagContextProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  static childContextTypes = {
    flagLowered: PropTypes.bool,
  }

  getChildContext() {
    return {
      flagLowered: true,
    };
  }

  render() {
    return this.props.children;
  }
}
