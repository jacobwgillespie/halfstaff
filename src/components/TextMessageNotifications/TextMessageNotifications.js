import RaisedButton from 'material-ui/RaisedButton';
import React, { Component } from 'react';

import PhoneInput from '../PhoneInput';

export default class TextMessageNotifications extends Component {
  constructor(props) {
    super(props);

    this.state = { submitAttempted: false };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitAttempted: true });

    console.log('submit', this.state);
  }

  onPhoneInputValidation = (valid) => {
    this.setState({ phoneInputValid: valid });
  }

  render() {
    const { submitAttempted } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <PhoneInput showValidation={submitAttempted} onValidation={this.onPhoneInputValidation} />
          <RaisedButton label="Sign in / Sign up" onClick={this.onSubmit} />
        </form>
      </div>
    );
  }
}
