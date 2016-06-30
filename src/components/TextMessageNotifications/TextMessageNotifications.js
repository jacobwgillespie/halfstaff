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
  }

  onPhoneInputValidation = (valid) => {
    this.setState({ phoneInputValid: valid });
  }

  render() {
    const { submitAttempted } = this.state;

    return (
      <div>
        <form action="/auth/start" method="POST">
          <PhoneInput
            name="number"
            showValidation={submitAttempted}
            onValidation={this.onPhoneInputValidation}
          />
          <RaisedButton label="Sign in / Sign up" onClick={this.onSubmit} primary />
        </form>
      </div>
    );
  }
}
